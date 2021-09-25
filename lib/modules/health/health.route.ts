import { Router } from 'express';
import partial from 'lodash/partial';

import { getHealth } from '&modules/health/controller';

export const healthRouter = (router: Router) => {
  router.get('/', partial(getHealth));
  return router;
};
