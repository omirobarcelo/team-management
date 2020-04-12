import { BadRequestException, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { validate } from 'class-validator';
import {
  DeepPartial,
  DeleteResult,
  FindConditions,
  FindManyOptions,
  FindOneOptions,
  Repository,
  UpdateResult
} from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { IdentifiedEntity } from '../entities/identified.entity';

export abstract class CrudService<T extends IdentifiedEntity> {
  protected constructor(protected readonly repository: Repository<T>) {}

  /**
   * Find all instances
   * @param options
   */
  public async getAll(options?: FindManyOptions<T>): Promise<{ items: T[]; count: number }> {
    const records = await this.repository.findAndCount(options);
    return { items: records[0], count: records[1] };
  }

  /**
   * Find an instance by its id
   * @param id
   * @param options
   */
  public async getOne(id: string, options?: FindOneOptions<T>): Promise<T> {
    const record = await this.repository.findOne(id, options);
    if (!record) {
      throw new NotFoundException(`The requested record was not found`);
    }
    return record;
  }

  /**
   * Create instance
   * @param entity
   */
  public async create(entity: DeepPartial<T>): Promise<T> {
    const obj = this.repository.create(entity);
    try {
      // https://github.com/Microsoft/TypeScript/issues/21592
      return await this.repository.save(obj as any);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  /**
   * Create instances
   * @param entities
   */
  public async createMany(entities: DeepPartial<T>[]): Promise<T[]> {
    const items = this.repository.create(entities);
    try {
      // https://github.com/Microsoft/TypeScript/issues/21592
      return await this.repository.save(items as any[]);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  /**
   * Update instance
   * @param criteria
   * @param entity
   */
  public async update(
    criteria: string | number | FindConditions<T>,
    entity: QueryDeepPartialEntity<T>
  ): Promise<UpdateResult> {
    try {
      return await this.repository.update(criteria, entity);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  /**
   * Delete instance
   * @param criteria
   */
  public async delete(criteria: string | number | FindConditions<T>): Promise<DeleteResult> {
    try {
      return this.repository.delete(criteria);
    } catch (err) {
      throw new NotFoundException(`The record was not found`, err);
    }
  }

  /**
   * Patch item by id with data
   * @param id
   * @param data
   */
  public async patch(id: string, data: DeepPartial<T>): Promise<T> {
    try {
      const object = await this.getOne(id);
      Object.assign(object, data);
      await this.validate(object);
      return await object.save();
    } catch (error) {
      throw error;
    }
  }

  /**
   * Validates an item instance
   * @param entity
   */
  private async validate(entity: T) {
    const errors = await validate(entity, {
      validationError: {
        target: true,
        value: true
      }
    });
    if (errors.length) {
      throw new UnprocessableEntityException(errors);
    }
  }
}
