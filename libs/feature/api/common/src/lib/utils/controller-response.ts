import { InternalServerErrorException, Logger } from '@nestjs/common';

export const controllerResponse = <T>(action: (resolve, reject) => Promise<void>, context: string): Promise<T> => {
  return new Promise<T>(async (resolve, reject) => {
    try {
      await action(resolve, reject);
    } catch (error) {
      Logger.error(error.message, error.stack, context);
      reject(new InternalServerErrorException({ message: error.message }));
    }
  });
};
