import { Router } from 'express';
import partial from 'lodash/partial';

import { getAll, add } from '&modules/department/controller';
import { validate } from 'express-validation';
import { departmentScheme } from '&validation/department';

export const departmentRouter = (router: Router) => {
  router.get('/', partial(getAll));
  router.post('/', validate(departmentScheme), partial(add));
  return router;
};
