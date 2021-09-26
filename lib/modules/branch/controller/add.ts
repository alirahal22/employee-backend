import { Request, Response } from 'express';

import { add as addBranch } from '../service/add';
import Branch from '../Branch';

const add = async (req: Request, res: Response) => {
  try {
    let branch = req.body as Branch;
    branch = await addBranch(branch);

    res.status(201);
    res.send(branch);
  } catch (error) {
    res.status(error.status);
    res.send(error);
  }
};

export { add };
