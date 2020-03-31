import { Controller, Get, InternalServerErrorException, Logger } from '@nestjs/common';
import {
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse
} from '@nestjs/swagger';
import { plainToClass } from 'class-transformer';
import { ExerciseDto } from '../dtos/exercise.dto';
import { ExercisesService } from '../services/exercises.service';

@ApiUnauthorizedResponse({ description: 'Unauthorized' })
@ApiForbiddenResponse({ description: 'Forbidden' })
@ApiInternalServerErrorResponse({ description: 'Internal Request Error' })
@ApiTags('Exercises')
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

  @ApiOkResponse({
    description: 'A list of exercises',
    type: ExerciseDto,
    isArray: true
  })
  @Get()
  async getAll(): Promise<ExerciseDto[]> {
    const action = async (resolve, reject) => {
      resolve(plainToClass(ExerciseDto, await this._service.getAll(), { strategy: 'excludeAll' }));
    };
    return this.controllerResponse<ExerciseDto[]>(action, 'ExercisesController:getAll');
  }
}
