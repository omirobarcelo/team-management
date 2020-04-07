import { MigrationInterface, QueryRunner } from 'typeorm';

export class ExerciseSlug1585582400830 implements MigrationInterface {
  name = 'ExerciseSlug1585582400830';

  public async up(queryRunner: QueryRunner): Promise<any> {
    // await queryRunner.query(
    //   `CREATE TABLE "temporary_exercise" ("id" varchar PRIMARY KEY NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "name" varchar NOT NULL DEFAULT ('New Exercise'), "muscles" text NOT NULL DEFAULT ('[]'), "category" text NOT NULL, "slug" varchar)`,
    //   undefined
    // );
    // await queryRunner.query(
    //   `INSERT INTO "temporary_exercise"("id", "createdAt", "updatedAt", "name", "muscles", "category") SELECT "id", "createdAt", "updatedAt", "name", "muscles", "category" FROM "exercise"`,
    //   undefined
    // );
    // await queryRunner.query(`DROP TABLE "exercise"`, undefined);
    // await queryRunner.query(`ALTER TABLE "temporary_exercise" RENAME TO "exercise"`, undefined);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    // await queryRunner.query(`ALTER TABLE "exercise" RENAME TO "temporary_exercise"`, undefined);
    // await queryRunner.query(
    //   `CREATE TABLE "exercise" ("id" varchar PRIMARY KEY NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "name" varchar NOT NULL DEFAULT ('New Exercise'), "muscles" text NOT NULL DEFAULT ('[]'), "category" text NOT NULL)`,
    //   undefined
    // );
    // await queryRunner.query(
    //   `INSERT INTO "exercise"("id", "createdAt", "updatedAt", "name", "muscles", "category") SELECT "id", "createdAt", "updatedAt", "name", "muscles", "category" FROM "temporary_exercise"`,
    //   undefined
    // );
    // await queryRunner.query(`DROP TABLE "temporary_exercise"`, undefined);
  }
}
