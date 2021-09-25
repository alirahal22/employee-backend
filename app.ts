import Express from 'express';
import { Logger } from './lib/utils/logger';

import '&config/db';
import { appRoutes } from './lib/app.routes';

const app = Express();

const port: number = parseInt(process.env.PORT) || 5000;

appRoutes(app);

app.listen(port, () => {
  Logger.info(`Server is running on port ${port}`);
});
