import express from 'express';
import reqLogger from '../startup/logger';
import error from '../middleware/error';
import auth from '../middleware/auth';
import subscribers from '../routes/subscribers';
import topics from '../routes/topics';
import publish from '../routes/publish';

export default (app: express.Application) => {
  app.use(express.json());
  app.use(reqLogger);
  app.use(error);
  app.use(auth);
  app.get('/', (_req, res) => {
    res.json({ status: true, message: 'Welcome to UtilizeCore Order API 👨‍🎤' });
  });
};
