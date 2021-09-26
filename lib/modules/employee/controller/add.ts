import { Request, Response } from 'express';

import { add as addEmployee } from '../service/add';
import Employee from '../Employee';

const add = async (req: Request, res: Response) => {
  try {
    let employee = req.body as Employee;
    employee = await addEmployee(employee);

    res.status(201);
    res.send(employee);
  } catch (error) {
    res.status(error.status);
    res.send(error);
  }
};

export { add };
