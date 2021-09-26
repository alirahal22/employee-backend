import { Request, Response } from 'express';

import Deparment from '../Department';
import { update as updateDepartment } from '../service/update';
import { get } from '../service/get';

const update = async (req: Request, res: Response) => {
  try {
    let department = req.body as Deparment;
    department = await updateDepartment(req.params.id, department);
    department = await get(req.params.id);

    res.status(200);
    res.send(department);
  } catch (error) {
    error.statusCode = error.statusCode || 500;

    res.status(error.statusCode);
    res.send(error);
  }
};

export { update };
