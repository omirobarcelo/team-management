import { MigrationInterface, QueryRunner } from 'typeorm';
import { UserEntity } from '@team-management-api/core/entities/user.entity';
import { plainToClass } from 'class-transformer';

export class SeedUsers1586606019008 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    const users = [
      {
        id: '8a56157c-6714-42e8-ab46-7b4b598b6a29',
        email: 'admin@gym.fit',
        password: await UserEntity.createPassword('test'),
        firstName: 'Admin',
        lastName: 'Admin',
        role: 'admin'
      },
      {
        id: '0e323ed8-8788-4621-a648-df399082136d',
        email: 'trainer@gym.fit',
        password: await UserEntity.createPassword('test'),
        firstName: 'Trainer',
        lastName: 'Trainer',
        role: 'trainer'
      },
      {
        id: '24c31eaa-8e42-4271-bdfe-a2ef898e1371',
        email: 'player.1@gym.fit',
        password: await UserEntity.createPassword('test'),
        firstName: 'Player1',
        lastName: 'Player1',
        role: 'player'
      }
    ];
    await queryRunner.manager
      .getRepository<UserEntity>(UserEntity)
      .save(plainToClass<UserEntity, any[]>(UserEntity, users));
  }

  public async down(queryRunner: QueryRunner): Promise<any> {}
}
