import { DynamicModule, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExercisesModule } from '@team-management/api/exercises';
import { databaseProviders } from './database.providers';
import { validationSchema } from './validate-input';

@Module({})
export class AppModule implements NestModule {
  static forRoot(): DynamicModule {
    return {
      module: AppModule,
      imports: [
        ConfigModule.forRoot({
          envFilePath: '.env.dev',
          validationSchema: validationSchema()
        }),
        TypeOrmModule.forRootAsync({
          imports: [ConfigModule],
          inject: [ConfigService],
          useFactory: async (configService: ConfigService) => databaseProviders(configService)
        }),
        ExercisesModule.forRoot()
      ]
    };
  }

  public configure(consumer: MiddlewareConsumer) {}
}
