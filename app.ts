import Express from 'express';

import { Logger } from './lib/utils/logger';
import { appRoutes } from './lib/app.routes';
import { errorHandler } from '&utils/errorHandler';
import { defaultStrategy } from '&utils/defaultStrategy';

/**
 * Connect to the mongo database before launching the app server.
 */
import '&config/db';

const app = Express();
const appErrorHandler = errorHandler([defaultStrategy]);

const port: number = parseInt(process.env.PORT) || 5000;

appRoutes(app);
appErrorHandler(app);

app.listen(port, () => {
  Logger.info(`Server is running on port ${port}`);
});
