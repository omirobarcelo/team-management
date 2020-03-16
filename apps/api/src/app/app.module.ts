import { DynamicModule, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ExercisesModule } from '@team-management/api/exercises';
import { databaseProviders } from './database.providers';

@Module({})
export class AppModule implements NestModule {
  static forRoot(): DynamicModule {
    return {
      module: AppModule,
      imports: [
        databaseProviders(),
        ExercisesModule.forRoot()
      ]
    };
  }

  public configure(consumer: MiddlewareConsumer) {}
}
