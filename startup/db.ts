//Database Connection
import winston from 'winston';
import mongoose from 'mongoose';
import config from 'config';

export default () => {
  const db: string = config.get('dbConnString');
  mongoose
    .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => winston.info(`Database connected...`));
};
