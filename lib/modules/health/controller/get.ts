import { Request, Response } from 'express';

import { getHealthService } from '../service/get';
import { makeError } from '&utils/makeError';
import { Logger } from '&utils/logger';

export const getHealth = async (_req: Request, res: Response) => {
  try {
    Logger.info('Checking the ms health');
    const result = getHealthService();
    Logger.info(`The ms health is ${result.status}`);

    res.statusCode = 200;
    res.send(result);
  } catch (error) {
    Logger.error(error);
    const errorStatus = error.statusCode || 500;

    res.status(errorStatus);
    res.send(makeError(error.message, errorStatus));
  }
};
