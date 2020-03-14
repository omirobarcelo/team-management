import { DynamicModule, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { exercisesControllers } from './controllers';
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
      imports: [],
      controllers: [...exercisesControllers],
      providers: [...exercisesServices],
      exports: []
    };
  }
  public configure(consumer: MiddlewareConsumer) {}
}
