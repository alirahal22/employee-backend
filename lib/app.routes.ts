import { Express } from 'express';

import { defaultRouter } from '&routers/default';
import { healthRouter } from '&modules/health/health.route';

export const appRoutes = (app: Express) => {
  app.use('/health', healthRouter(defaultRouter()));
};
