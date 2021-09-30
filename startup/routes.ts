import express from 'express';
import reqLogger from '../startup/logger';
import error from '../middleware/error';
import auth from '../middleware/auth';
import order from '../routes/orders';
import item from '../routes/items';

export default (app: express.Application) => {
  app.use(express.json());
  app.use(reqLogger);
  app.use(error);
  app.use(auth);
  app.use('/api/orders', order);
  app.use('/api/items', item);
  app.get('/', (_req, res) => {
    res.json({ status: true, message: 'Welcome to UtilizeCore Order API 👨‍🎤' });
  });
};
