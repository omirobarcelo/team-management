import * as Joi from '@hapi/joi';

export const validationSchema = () => {
  return Joi.object({
    NODE_ENV: Joi.string()
      .valid('development', 'production', 'test')
      .default('development'),
    APP_ROOT_PATH: Joi.string(),
    TYPEORM_DATABASE: Joi.string().default('gym-dev.sqlite'),
    TYPEORM_SYNCHRONIZE: Joi.bool(),
    TYPEORM_ENABLE_LOGGING: Joi.bool(),
    TYPEORM_MIGRATIONS_RUN: Joi.bool(),
    DROP_SCHEMA: Joi.bool(),
    API_ENDPOINT: Joi.string().default('api')
  });
};
