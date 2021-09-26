import { Router } from 'express';
import partial from 'lodash/partial';
import { validate } from 'express-validation';

import {
  defaultGetAllScheme,
  defaultGetScheme,
} from '&validation/defaultSchemes';
import { getAll, get, add, update } from '&modules/employee/controller';
import {
  employeeCreationScheme,
  employeePatchScheme,
} from '&validation/employeeSchemes';

export const employeeRouter = (router: Router) => {
  router.get('/', validate(defaultGetAllScheme), partial(getAll));
  router.get('/:id', validate(defaultGetScheme), partial(get));

  router.post('/', validate(employeeCreationScheme), partial(add));
  router.patch('/:id', validate(employeePatchScheme), partial(update));
  return router;
};
