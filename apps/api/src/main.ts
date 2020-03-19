import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import * as chalk from 'chalk';
import * as express from 'express';
import { AppModule } from './app/app.module';
import { environment as envDev } from './environments/environment';
import { environment as envProd } from './environments/environment.prod';

async function bootstrap() {
  const logger = new Logger(`${chalk.blueBright('Start')}`);

  // Get environment according to NODE_ENV, initialize app and config service
  const environment = process.env.NODE_ENV === 'production' ? envProd : envDev;
  // TODO may be missing auth, passport, and core providers (similar to pantabio)
  const app = await NestFactory.create(AppModule.forRoot(), { cors: environment.cors });
  const configService = app.get(ConfigService);

  // Parse JSON and encoded URLs to have access to the request and body
  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ limit: '50mb', extended: true }));

  // Set global prefix for all endpoints 
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  // Application start
  const port = configService.get<number>('PORT') || 3333;
  await app.listen(port, () => {
    Logger.log(`
    ${chalk.magentaBright(` _______ ___  ___ ___  ___ `)}${chalk.whiteBright(`                   __      __`)}
    ${chalk.magentaBright(`|       |\\  \\/  /|   \\/   |`)}${chalk.whiteBright(` _____ _____ _____|  |_ __|  | ___ _____`)}
    ${chalk.magentaBright(`|   ' __|_\\    / |        |`)}${chalk.whiteBright(`|     |   , |  ___|   _|__|  |/  /|   , |`)}
    ${chalk.magentaBright(`|    |   | |  |  |  |__|  |`)}${chalk.whiteBright(`|  |  |  '  |____ |  | |  |     / |  '  |`)}
    ${chalk.magentaBright(`|________| |__|  |__|  |__|`)}${chalk.whiteBright(`|__|__|____,|_____|__| |__|__|\\__\\|____,|`)}
    `);
    logger.warn(`Environment: ${chalk.yellowBright(configService.get('NODE_ENV'))}`);
    logger.warn(`http://localhost:${port}/`);
  });
}

bootstrap();
