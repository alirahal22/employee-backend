import { Request, Response } from 'express';
import { Logger } from '../../../utils/logger';
import { getAll as getAllDepartments } from '../service/get';
const getAll = async (req: Request, res: Response) => {
  const all = await getAllDepartments();
  Logger.info('Controller is done');
  res.status(200);
  res.send(all);
};

export { getAll };
