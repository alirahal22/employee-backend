import { Router } from 'express';
import partial from 'lodash/partial';
import { validate } from 'express-validation';

import {
  defaultGetAllScheme,
  defaultGetScheme,
} from '&validation/defaultSchemes';
import { getAll, get, add, update } from '&modules/department/controller';
import {
  departmentCreationScheme,
  departmentPatchScheme,
} from '&/lib/validation/departmentSchemes';

export const departmentRouter = (router: Router) => {
  router.get('/', validate(defaultGetAllScheme), partial(getAll));
  router.get('/:id', validate(defaultGetScheme), partial(get));

  router.post('/', validate(departmentCreationScheme), partial(add));
  router.patch('/:id', validate(departmentPatchScheme), partial(update));
  return router;
};
