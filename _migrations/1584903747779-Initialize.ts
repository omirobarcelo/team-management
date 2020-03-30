import { MigrationInterface, QueryRunner } from 'typeorm';

export class Initialize1584903747779 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `CREATE TABLE "exercise" ("id" varchar PRIMARY KEY NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "name" varchar NOT NULL DEFAULT ('New Exercise'), "muscles" text NOT NULL DEFAULT ('[]'), "category" text NOT NULL)`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`DROP TABLE "exercise"`);
  }
}
