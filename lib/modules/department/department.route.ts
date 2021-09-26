import { Router } from 'express';
import partial from 'lodash/partial';

import { getAll, get, add, update } from '&modules/department/controller';
import { validate } from 'express-validation';
import {
  departmentCreationScheme,
  departmentPatchScheme,
} from '&/lib/validation/departmentSchemes';
import { defaultGetScheme } from '&validation/defaultSchemes';

export const departmentRouter = (router: Router) => {
  router.get('/', partial(getAll));
  router.get('/:id', validate(defaultGetScheme), partial(get));

  router.post('/', validate(departmentCreationScheme), partial(add));
  router.patch('/:id', validate(departmentPatchScheme), partial(update));
  return router;
};
