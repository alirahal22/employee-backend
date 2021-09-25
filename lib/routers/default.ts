import { Router, urlencoded, json, static as statik } from 'express';
import CORS from 'cors';

export const defaultRouter = () => {
  const router = Router({ mergeParams: true });

  router.use(CORS());
  router.use(urlencoded({ extended: true }));
  router.use(json());
  router.use(statik('public'));

  router.all('/*', (_req, res, next) => {
    res.statusCode = 200;
    next();
  });

  return router;
};
