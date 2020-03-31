import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ExerciseEntity } from '../entities/exercise.entity';

@Injectable()
export class ExercisesService {
  private _exercises = [
    {
      id: 'exA1',
      name: 'Ex A1',
      muscles: ['m1', 'm2'],
      category: {
        id: 'catA',
        name: 'Cat A'
      }
    },
    {
      id: 'exA2',
      name: 'Ex A2',
      muscles: ['m1', 'm2', 'm3'],
      category: {
        id: 'catA',
        name: 'Cat A'
      }
    },
    {
      id: 'exA3',
      name: 'Ex A3',
      muscles: ['m1', 'm2'],
      category: {
        id: 'catA',
        name: 'Cat A'
      }
    },
    {
      id: 'exB1',
      name: 'Ex B1',
      muscles: ['m1'],
      category: {
        id: 'catB',
        name: 'Cat B'
      }
    },
    {
      id: 'exB2',
      name: 'Ex B2',
      muscles: ['m1', 'm2'],
      category: {
        id: 'catB',
        name: 'Cat B'
      }
    },
    {
      id: 'exB3',
      name: 'Ex B3',
      muscles: ['m1', 'm2'],
      category: {
        id: 'catB',
        name: 'Cat B'
      }
    },
    {
      id: 'exC1',
      name: 'Ex C1',
      muscles: ['m1', 'm2', 'm3'],
      category: {
        id: 'catC',
        name: 'Cat C'
      }
    },
    {
      id: 'exC2',
      name: 'Ex C2',
      muscles: ['m1', 'm2'],
      category: {
        id: 'catC',
        name: 'Cat C'
      }
    },
    {
      id: 'exC3',
      name: 'Ex C3',
      muscles: ['m1'],
      category: {
        id: 'catC',
        name: 'Cat C'
      }
    }
  ];

  constructor(
    @InjectRepository(ExerciseEntity)
    private readonly _repository: Repository<ExerciseEntity>
  ) {}

  async getAll() {
    // return this._exercises;
    const obj = this._repository.create({
      name: 'Ex A2',
      muscles: ['m2'],
      category: { id: 'catA', name: 'Cat A' }
    });
    await this._repository.save(obj);
    return this._repository.find();
  }
}
