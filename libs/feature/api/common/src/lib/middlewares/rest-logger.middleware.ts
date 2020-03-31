import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import * as chalk from 'chalk';
import { Request, Response } from 'express';

@Injectable()
/**
 * The rest logger middleware tracks the requested routes
 * [METHOD] statusCode | httpVersion | path
 */
export class RestLoggerMiddleware implements NestMiddleware<Request, Response> {
  private logger = new Logger('Request');
  use(req: Request, res: Response, next: Function) {
    this.logger.log(
      `[${chalk.white(req.method)}] ${chalk.cyan(res.statusCode.toString())} ` +
        `${chalk.white('|')} ${chalk.cyan(req.httpVersion)} ${chalk.white('|')} ${chalk.cyan(req.ip)} ` +
        `[${chalk.white('route:')} ${chalk.blue(req.baseUrl)}]`
    );
    next();
  }
}
