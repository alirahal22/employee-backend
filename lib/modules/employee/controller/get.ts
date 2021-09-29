import { Request, Response } from 'express';

import { Logger } from '&utils/logger';
import { getAll as getAllEmployeees, get as getEmployee } from '../service/get';

const getAll = async (req: Request, res: Response) => {
  try {
    const all = await getAllEmployeees(req.query);
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
    const employee = await getEmployee(req.params.id);
    res.status(200);
    res.send(employee);
  } catch (error) {
    error.status = error.status || 500;

    res.status(error.status);
    res.send(error);
  }
};

export { getAll, get };
