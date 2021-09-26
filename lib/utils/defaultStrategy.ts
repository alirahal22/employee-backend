import { NextFunction, Response, Request } from 'express';
import { Error } from './makeError';
import { Logger } from './logger';

/**
 * Specify the basic error handling method for thrown execptions,
 * specifically with the makeError function.
 * @param err the throw error while processing the request
 */
export const defaultStrategy = (
  err: Error,
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (res.headersSent) {
    next(err);
  }

  Logger.error(JSON.stringify(err));

  res.status(err.statusCode ?? 500);
  res.set('Content-Type', 'application/json');
  res.send({ statusCode: err.statusCode ?? 500, message: err.message });
  next(err);
};
