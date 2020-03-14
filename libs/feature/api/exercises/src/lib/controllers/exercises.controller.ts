import { Controller, Get, InternalServerErrorException, Logger } from '@nestjs/common';
import { ExercisesService } from '../services/exercises.service';

@Controller('exercises')
export class ExercisesController {
  protected controllerResponse<T>(action: (resolve, reject) => void, context: string): Promise<T> {
    return new Promise<T>(async (resolve, reject) => {
      try {
        action(resolve, reject);
      } catch (error) {
        Logger.error(error.message, error.stack, context);
        reject(new InternalServerErrorException(error));
      }
    });
  }

  constructor(private readonly _service: ExercisesService) {}

  @Get()
  async getAll(): Promise<any> {
    const action = async (resolve, reject) => {
      resolve(this._service.getAll());
    };
    return this.controllerResponse<any>(action, 'ExercisesController:getAll');
  }
}
