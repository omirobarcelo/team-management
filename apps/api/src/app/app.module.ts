import { DynamicModule, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ExercisesModule } from '@team-management/api/exercises';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule implements NestModule {
  static forRoot(): DynamicModule {
    return {
      module: AppModule,
      imports: [ExercisesModule.forRoot()]
    };
  }

  public configure(consumer: MiddlewareConsumer) {}
}
