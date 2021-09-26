import { Request, Response } from 'express';

import Branch from '../Branch';
import { update as updateBranch } from '../service/update';
import { get } from '../service/get';

const update = async (req: Request, res: Response) => {
  try {
    let branch = req.body as Branch;
    branch = await updateBranch(req.params.id, branch);
    branch = await get(req.params.id);

    res.status(200);
    res.send(branch);
  } catch (error) {
    error.status = error.status || 500;

    res.status(error.status);
    res.send(error);
  }
};

export { update };
