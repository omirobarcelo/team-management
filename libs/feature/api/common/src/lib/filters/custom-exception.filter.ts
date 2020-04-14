import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { JsonWebTokenError } from 'jsonwebtoken';
import { CustomValidationError } from '../errors/custom-validation.error';

@Catch(SyntaxError, CustomValidationError, HttpException, JsonWebTokenError)
export class CustomExceptionFilter implements ExceptionFilter {
  constructor() {}

  catch(
    exception: CustomValidationError | SyntaxError | Error | HttpException | JsonWebTokenError,
    host: ArgumentsHost
  ) {
    if (exception instanceof CustomValidationError) {
      const errors = {};
      exception.errors.forEach((error: ValidationError) => {
        Object.keys(error.constraints).forEach((key: string) => {
          if (!errors[error.property]) {
            errors[error.property] = [];
          }
          errors[error.property].push(error.constraints[key]);
        });
      });
      this.response(exception, host, {
        validationErrors: errors
      });
    }
    if (exception instanceof SyntaxError) {
      this.response(exception, host, {
        message: exception.message ? exception.message : 'Syntax error'
      });
    }
    if (exception instanceof JsonWebTokenError) {
      this.response(exception, host, {
        message: exception.message
      });
    }
    if (exception instanceof HttpException) {
      this.response(
        exception,
        host,
        {
          message: exception.message && exception.message.message ? exception.message.message : 'Http exception'
        },
        exception.getStatus()
      );
    }
  }

  private response(
    exception: CustomValidationError | SyntaxError | Error | HttpException | JsonWebTokenError,
    host: ArgumentsHost,
    data: any,
    status?: number
  ) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    Logger.error(JSON.stringify(exception), undefined, CustomExceptionFilter.name);
    response.status(status ? status : HttpStatus.BAD_REQUEST).json(data);
  }
}
