import { Router } from 'express';
import partial from 'lodash/partial';

import { getAll, add } from '&modules/department/controller';

export const departmentRouter = (router: Router) => {
  router.get('/', partial(getAll));
  router.post('/', partial(add));
  return router;
};
