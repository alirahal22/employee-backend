import { Request, Response } from 'express';

import Department from '../Department';
import { update as updateDepartment } from '../service/update';
import { get } from '../service/get';

const update = async (req: Request, res: Response) => {
  try {
    let department = req.body as Department;
    department = await updateDepartment(req.params.id, department);
    department = await get(req.params.id);

    res.status(200);
    res.send(department);
  } catch (error) {
    error.status = error.status || 500;

    res.status(error.status);
    res.send(error);
  }
};

export { update };
