import { Router } from 'express';
import partial from 'lodash/partial';

import { getAll, get, add } from '&modules/department/controller';
import { validate } from 'express-validation';
import { departmentCreationScheme } from '&/lib/validation/departmentSchemes';
import { defaultGetScheme } from '&validation/defaultSchemes';

export const departmentRouter = (router: Router) => {
  router.get('/', partial(getAll));
  router.get('/:id', validate(defaultGetScheme), partial(get));

  router.post('/', validate(departmentCreationScheme), partial(add));
  return router;
};
