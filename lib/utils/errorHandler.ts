import { Express } from 'express';

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
