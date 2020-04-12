import { DynamicModule, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { coreEntities } from './entities';
import { coreServices } from './services';

@Module({})
export class CoreModule implements NestModule {
  static forFeature(): DynamicModule {
    return {
      module: CoreModule,
      imports: [TypeOrmModule.forFeature([...coreEntities])],
      providers: [...coreServices],
      exports: [...coreServices]
    };
  }

  static forRoot(): DynamicModule {
    return {
      module: CoreModule,
      imports: [TypeOrmModule.forFeature([...coreEntities])],
      controllers: [],
      providers: [...coreServices],
      exports: [...coreServices]
    };
  }

  public configure(consumer: MiddlewareConsumer) {}
}
