import { DynamicModule, MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '@team-management-api/auth';
import { CustomExceptionFilter, RestLoggerMiddleware } from '@team-management-api/common';
import { CoreModule } from '@team-management-api/core';
import { ExercisesModule } from '@team-management-api/exercises';
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
        PassportModule.register({ defaultStrategy: 'jwt' }),
        CoreModule.forRoot(),
        AuthModule.forRoot(),
        ExercisesModule.forRoot()
      ],
      providers: [
        {
          provide: APP_FILTER,
          useClass: CustomExceptionFilter
        }
      ]
    };
  }

  public configure(consumer: MiddlewareConsumer) {
    // Enable REST logger middleware for all routes
    consumer.apply(RestLoggerMiddleware).forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
