import { Request, Response } from 'express';

import { Logger } from '&utils/logger';
import { getAll as getAllBranches, get as getBranch } from '../service/get';

const getAll = async (req: Request, res: Response) => {
  try {
    const all = await getAllBranches(req.query);
    res.status(200);
    res.send(all);
  } catch (error) {
    Logger.error(error);
    error.status = error.status || 500;

    res.status(error.status);
    res.send(error);
  }
};

const get = async (req: Request, res: Response) => {
  try {
    const branch = await getBranch(req.params.id);
    res.status(200);
    res.send(branch);
  } catch (error) {
    error.status = error.status || 500;

    res.status(error.status);
    res.send(error);
  }
};

export { getAll, get };
