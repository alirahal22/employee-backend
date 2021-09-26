import { Request, Response } from 'express';

import { Logger } from '&utils/logger';
import {
  getAll as getAllDepartments,
  get as getDepartment,
} from '../service/get';

const getAll = async (req: Request, res: Response) => {
  try {
    const all = await getAllDepartments(req.query);
    res.status(200);
    res.send(all);
  } catch (error) {
    Logger.error(error);
    error.status = error.status || 500;

    res.status(error.status);
    res.send(error);
  }
};

const get = async (req: Request, res: Response) => {
  try {
    const department = await getDepartment(req.params.id);
    res.status(200);
    res.send(department);
  } catch (error) {
    error.status = error.status || 500;

    res.status(error.status);
    res.send(error);
  }
};

export { getAll, get };
