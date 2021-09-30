import winston from 'winston';
import 'express-async-errors';

export default () => {
  winston.exceptions.handle(
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'uncaughtExceptions.log' })
  );

  // handle unhandledRejection exception types
  process.on('unhandledRejection', (ex) => {
    throw ex;
  });

  // save logs to file
  winston.add(new winston.transports.Console());
  winston.add(new winston.transports.File({ filename: 'logfile.log' }));
};
