import { Express } from 'express';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const errorHandler = (errorList: any) => {
  const ErrorHandler = (app: Express) => {
    Object.keys(errorList).forEach((key) => {
      if ({}.hasOwnProperty.call(errorList, key)) {
        app.use(errorList[key]);
      }
    });
    return app;
  };
  return ErrorHandler;
};
