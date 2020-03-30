import { plainToClass } from 'class-transformer';
import { MigrationInterface, QueryRunner } from 'typeorm';
import { ExerciseEntity } from '@team-management/api/exercises/entities/exercise.entity';

export class SeedExercises1584903747780 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.manager.getRepository<ExerciseEntity>(ExerciseEntity).save(
      plainToClass<ExerciseEntity, any[]>(ExerciseEntity, [
        {
          id: '10906c9d-678e-4995-80d3-0ab34a277194',
          name: 'Ex 1A',
          muscles: ['m1', 'm2'],
          category: {
            id: '2ace80f7-8280-42eb-b70c-04a4115db81b',
            name: 'Cat A'
          }
        },
        {
          id: 'f4c217ec-e168-47e5-bcfe-7b2066d11d1f',
          name: 'Ex 2A',
          muscles: ['m2'],
          category: {
            id: 'e435ec6a-c710-468d-b948-415c75360fe3',
            name: 'Cat A'
          }
        }
      ])
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {}
}
