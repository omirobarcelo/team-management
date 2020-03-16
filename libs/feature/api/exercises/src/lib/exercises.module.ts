import { DynamicModule, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { exercisesControllers } from './controllers';
import { exercisesEntities } from './entities';
import { exercisesServices } from './services';

@Module({})
export class ExercisesModule implements NestModule {
  static forFeature(): DynamicModule {
    return {
      module: ExercisesModule,
      imports: [],
      providers: [...exercisesServices],
      exports: []
    };
  }

  static forRoot(): DynamicModule {
    return {
      module: ExercisesModule,
      imports: [TypeOrmModule.forFeature([...exercisesEntities])],
      controllers: [...exercisesControllers],
      providers: [...exercisesServices],
      exports: []
    };
  }
  public configure(consumer: MiddlewareConsumer) {}
}
