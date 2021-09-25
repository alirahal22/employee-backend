import Express from 'express';
import { Logger } from './lib/utils/logger';

import './lib/config/db';

const app = Express();
const port = 3000;
app.get('/', (req, res) => {
  res.send({ status: 'running' });
});

app.listen(port, () => {
  Logger.info(`Server is running on port ${port}`);
});
