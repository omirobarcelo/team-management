import { DynamicModule, MiddlewareConsumer, Module } from '@nestjs/common';

@Module({})
export class AuthModule {
  static forFeature(): DynamicModule {
    return {
      module: AuthModule,
      imports: [],
      providers: [],
      exports: []
    };
  }

  static forRoot(): DynamicModule {
    return {
      module: AuthModule,
      imports: [],
      controllers: [],
      providers: [],
      exports: []
    };
  }
  public configure(consumer: MiddlewareConsumer) {}
}
