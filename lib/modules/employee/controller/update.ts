import { Request, Response } from 'express';

import Employee from '../Employee';
import { update as updateEmployee } from '../service/update';
import { get } from '../service/get';
import { Logger } from '&/lib/utils/logger';

const update = async (req: Request, res: Response) => {
  try {
    let employee = req.body as Employee;
    employee = await updateEmployee(req.params.id, employee);
    employee = await get(req.params.id);

    res.status(200);
    res.send(employee);
  } catch (error) {
    error.status = error.status || 500;

    res.status(error.status);
    res.send(error);
  }
};

export { update };
