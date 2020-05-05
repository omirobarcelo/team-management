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
          // Nx overwrites NODE_ENV on compilation, so this is a workaround to get the real value
          // https://stackoverflow.com/a/59805161/8526764
          envFilePath: AppModule.getEnvFile(process.env['NODE' + '_ENV']),
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

  private static getEnvFile(nodeEnv: string): string {
    let envFile = '.env.dev';
    switch (nodeEnv) {
      case 'production':
        envFile = '.env.prod';
        break;
      case 'test':
        envFile = '.env.test';
        break;
      case 'development':
      default:
        envFile = '.env.dev';
        break;
    }
    return envFile;
  }

  public configure(consumer: MiddlewareConsumer) {
    // Enable REST logger middleware for all routes
    consumer.apply(RestLoggerMiddleware).forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
