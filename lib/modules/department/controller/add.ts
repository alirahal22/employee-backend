import { add as addDepartment } from '../service/add';
import Deparment from '../Department';
import { Request, Response } from 'express';

const add = async (req: Request, res: Response) => {
  try {
    let department = req.body as Deparment;
    department = await addDepartment(department);

    res.status(201);
    res.send(department);
  } catch (error) {
    res.status(error.statusCode);
    res.send(error);
  }
};

export { add };
