import * as Joi from '@hapi/joi';

export const validationSchema = () => {
  return Joi.object({
    NODE_ENV: Joi.string()
      .valid('development', 'production', 'test')
      .default('development'),
    APP_ROOT_PATH: Joi.string().default('.'),
    TYPEORM_DATABASE: Joi.string().default('gym-dev.sqlite'),
    TYPEORM_SYNCHRONIZE: Joi.bool().default(false),
    TYPEORM_ENABLE_LOGGING: Joi.bool().default(false),
    TYPEORM_MIGRATIONS_RUN: Joi.bool().default(true),
    DROP_SCHEMA: Joi.bool().default(false),
    API_ENDPOINT: Joi.string().default('api')
  });
};
