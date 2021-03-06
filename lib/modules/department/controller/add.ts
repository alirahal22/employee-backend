import { Request, Response } from 'express';

import { add as addDepartment } from '../service/add';
import Department from '../Department';

const add = async (req: Request, res: Response) => {
  try {
    let department = req.body as Department;
    department = await addDepartment(department);

    res.status(201);
    res.send(department);
  } catch (error) {
    res.status(error.status);
    res.send(error);
  }
};

export { add };
