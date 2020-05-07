import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CrudService } from '@team-management-api/common';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class UsersService extends CrudService<UserEntity> {
  constructor(@InjectRepository(UserEntity) private readonly _repository: Repository<UserEntity>) {
    super(_repository);
  }

  findByEmail(email: string): Promise<UserEntity> {
    return this._repository.findOne({ where: { email } });
  }
}
