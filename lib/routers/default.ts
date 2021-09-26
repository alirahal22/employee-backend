import { Router, urlencoded, json, static as statik } from 'express';
import CORS from 'cors';

/**
 *
 * @returns a router instance that processes incoming requests based
 * based on the specified configuration
 */
export const defaultRouter = (): Router => {
  const router = Router({ mergeParams: true });

  router.use(CORS());
  router.use(urlencoded({ extended: true }));
  router.use(json());
  router.use(statik('public'));

  router.all('/*', (_req, res, next) => {
    res.status(200);
    next();
  });

  return router;
};
