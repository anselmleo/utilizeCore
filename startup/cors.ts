import cors from 'cors';
import express from 'express';

export default (app: express.Application) => {
  let corsOptions = { exposedHeaders: '*' };
  app.use(cors(corsOptions));
};
