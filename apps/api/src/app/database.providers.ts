import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm/dist/interfaces/typeorm-options.interface';
import { exercisesEntities } from '@team-management/api/exercises';
import * as path from 'path';

export const databaseProviders = (configService: ConfigService) => {
  const normalizePath = (_path: string) => (path.normalize(path.join(__dirname, _path)));

  const commonDB: TypeOrmModuleOptions = {
    type: 'sqlite',
    entities: [...exercisesEntities]
  };

  const defaultDB: TypeOrmModuleOptions = {
    ...commonDB,
    database: path.join(
      configService.get('APP_ROOT_PATH', '.'),
      configService.get('TYPEORM_DATABASE', 'gym-dev.sqlite')
    ),
    logging: configService.get<boolean>('TYPEORM_ENABLE_LOGGING', true) ? ['query', 'error'] : [],
    cache: true,
    synchronize: configService.get<boolean>('TYPEORM_SYNCHRONIZE', false),
    migrations: [normalizePath('_migrations/*.js'), normalizePath('_seeds/dev/*.js')],
    migrationsRun: configService.get<boolean>('TYPEORM_MIGRATIONS_RUN', true),
    dropSchema: configService.get<boolean>('DROP_SCHEMA', false)
  };

  Logger.debug(defaultDB.database, 'Loading database');
  Logger.debug(defaultDB.migrations, 'Running Migrations');
  return defaultDB;
};
