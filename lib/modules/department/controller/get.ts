import { Request, Response } from 'express';

import {
  getAll as getAllDepartments,
  get as getDepartment,
} from '../service/get';

const getAll = async (req: Request, res: Response) => {
  const all = await getAllDepartments();
  res.status(200);
  res.send(all);
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
