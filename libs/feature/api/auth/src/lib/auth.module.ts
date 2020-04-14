import { ConfigModule } from '@nestjs/config';
import { CoreModule } from '@team-management-api/core';
import { DynamicModule, MiddlewareConsumer, Module } from '@nestjs/common';
import { authControllers } from './controllers';
import { authServices } from './services';

@Module({})
export class AuthModule {
  static forFeature(): DynamicModule {
    return {
      module: AuthModule,
      imports: [ConfigModule, CoreModule.forFeature()],
      providers: [...authServices],
      exports: []
    };
  }

  static forRoot(): DynamicModule {
    return {
      module: AuthModule,
      imports: [ConfigModule, CoreModule.forFeature()],
      controllers: [...authControllers],
      providers: [...authServices],
      exports: []
    };
  }

  public configure(consumer: MiddlewareConsumer) {}
}
