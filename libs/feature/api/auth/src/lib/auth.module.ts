import { DynamicModule, MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CoreModule } from '@team-management-api/core';
import { authControllers } from './controllers';
import { authServices } from './services';
import { JwtStrategy } from './strategies/jwt.strategy';

const strategies = [JwtStrategy];

@Module({})
export class AuthModule {
  static forFeature(): DynamicModule {
    return {
      module: AuthModule,
      imports: [ConfigModule, CoreModule.forFeature()],
      providers: [...authServices, ...strategies],
      exports: []
    };
  }

  static forRoot(): DynamicModule {
    return {
      module: AuthModule,
      imports: [ConfigModule, CoreModule.forFeature()],
      controllers: [...authControllers],
      providers: [...authServices, ...strategies],
      exports: []
    };
  }

  public configure(consumer: MiddlewareConsumer) {}
}
