import { Request, Response } from 'express';

import { _delete as deleteEmployee } from '../service/delete';

const _delete = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await deleteEmployee(id);

    res.status(200);
    res.send({ status: 200, message: 'Delete success' });
  } catch (error) {
    error.status = error.status || 500;
    res.status(error.status);
    res.send(error);
  }
};

export { _delete };
