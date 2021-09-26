import { Express } from 'express';

import { defaultRouter } from '&routers/default';
import { healthRouter } from '&modules/health/health.route';
import { departmentRouter } from '&modules/department/department.route';

/**
 * All routes should be defined here and a specific router is assigned for
 * each path. The default router is used in case no additional validation
 * is needed for this listen path.
 * @param app The express instance that the project is running on.
 */
export const appRoutes = (app: Express) => {
  app.use('/health', healthRouter(defaultRouter()));
  app.use('/department', departmentRouter(defaultRouter()));
};
