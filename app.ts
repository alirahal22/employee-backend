import Express from 'express';
import { Logger } from './lib/utils/logger';

import '&config/db';
import { appRoutes } from './lib/app.routes';
import { errorHandler } from './lib/utils/errorHandler';
import { defaultStrategy } from './lib/utils/defaultStrategy';

const app = Express();
const appErrorHandler = errorHandler([defaultStrategy]);

const port: number = parseInt(process.env.PORT) || 5000;

appRoutes(app);
appErrorHandler(app);

app.listen(port, () => {
  Logger.info(`Server is running on port ${port}`);
});
