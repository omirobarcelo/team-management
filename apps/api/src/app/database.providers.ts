import { Logger } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmModuleOptions } from '@nestjs/typeorm/dist/interfaces/typeorm-options.interface';
import { exercisesEntities } from '@team-management/api/exercises';

const commonDB: TypeOrmModuleOptions = {
  type: 'sqlite',
  synchronize: true,
  entities: [
    ...exercisesEntities
  ]
};

const defaultDB: TypeOrmModuleOptions = {
  ...commonDB,
  database: `${__dirname}/../../../gym-dev.sqlite`,
  logging: ['query', 'error'],
  cache: true,
  migrations: [],
  migrationsRun: true,
  dropSchema: true
};

export const databaseProviders = () => {
  Logger.debug(defaultDB.database, 'Loading database');
  Logger.debug(defaultDB.migrations, 'Running Migrations');
  return TypeOrmModule.forRoot(defaultDB);
};
