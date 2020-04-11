import { DynamicModule, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { coreEntities } from './entities';

@Module({})
export class CoreModule implements NestModule {
  static forFeature(): DynamicModule {
    return {
      module: CoreModule,
      imports: [],
      providers: [],
      exports: []
    };
  }

  static forRoot(): DynamicModule {
    return {
      module: CoreModule,
      imports: [TypeOrmModule.forFeature([...coreEntities])],
      controllers: [],
      providers: [],
      exports: []
    };
  }
  public configure(consumer: MiddlewareConsumer) {}
}
