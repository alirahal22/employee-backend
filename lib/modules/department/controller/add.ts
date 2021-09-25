import { Logger } from '../../../utils/logger';
import { add as addDepartment } from '../service/add';
import Deparment from '../Department';
import { insert } from '&/lib/config/db';
import { Request, Response } from 'express';

const add = async (req: Request, res: Response) => {
  let department = req.body as Deparment;
  department = insert('department', department);

  res.status(201);
  res.send(department);
};

export { add };
