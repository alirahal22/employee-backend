import { Router } from 'express';
import partial from 'lodash/partial';
import { validate } from 'express-validation';

import {
  defaultGetAllScheme,
  defaultGetScheme,
} from '&validation/defaultSchemes';
import { getAll, get, add, update } from '&modules/branch/controller';
import {
  branchCreationScheme,
  branchPatchScheme,
} from '&validation/branchSchemes';

export const branchRouter = (router: Router) => {
  router.get('/', validate(defaultGetAllScheme), partial(getAll));
  router.get('/:id', validate(defaultGetScheme), partial(get));

  router.post('/', validate(branchCreationScheme), partial(add));
  router.patch('/:id', validate(branchPatchScheme), partial(update));
  return router;
};
