import { Controller, Get, InternalServerErrorException, Logger, Req, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse
} from '@nestjs/swagger';
import { SnkAuthGuard } from '@team-management-api/auth/guards/auth.guard';
import { plainToClass } from 'class-transformer';
import { ExerciseDto } from '../dtos/exercise.dto';
import { ExercisesService } from '../services/exercises.service';

@ApiBearerAuth()
@UseGuards(SnkAuthGuard)
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
  async getAll(@Req() req): Promise<ExerciseDto[]> {
    Logger.log(req.user, 'req.user');
    const action = async (resolve, reject) => {
      resolve(plainToClass(ExerciseDto, await this._service.getAll(), { strategy: 'excludeAll' }));
    };
    return this.controllerResponse<ExerciseDto[]>(action, 'ExercisesController:getAll');
  }
}
