import { NextFunction, Response, Request } from 'express';

import { Logger } from './logger';

/**
 * Specify the basic error handling method for thrown execptions,
 * specifically with the makeError function.
 * @param err the throw error while processing the request
 */
export const defaultStrategy = (
  err,
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  Logger.error(JSON.stringify(err));
  const statusCode = err.status ?? err.statusCode ?? 500;

  res.status(statusCode);
  res.set('Content-Type', 'application/json');
  res.send({
    status: statusCode,
    message: err.message,
  });
  next(err);
};
