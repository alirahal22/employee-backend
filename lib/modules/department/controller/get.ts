import { Request, Response } from 'express';
import { isEmpty } from 'lodash';
import { notFoundError } from '&/lib/utils/makeError';
import { Logger } from '&utils/logger';
import { Error } from '../../../utils/makeError';
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
    res.status(error.statusCode);
    res.send(error);
  }
};

export { getAll, get };
