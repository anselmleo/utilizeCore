import config from 'config';
import winston from 'winston';
import { Request, Response, NextFunction } from 'express';

export default (req: Request, _res: Response, next: NextFunction) => {
  if (
    config.get('environment') === 'dev' ||
    config.get('environment') === 'testing' ||
    config.get('environment') === 'staging'
  ) {
    // this should be disable for production -->
    console.log({
      host: req.headers['host'],
      contentType: req.headers['content-type'],
      Authorization: req.headers['Authorization'],
      method: req.method,
      url: req.url,
      body: req.body
    });
    // <-- --------------------[ line 11 to 18 for debugging purposes only ]------------------

    winston.info(
      `New HTTP Request... host: ${req.headers['host']}, contentType: ${req.headers['content-type']}, Authorization: ${req.headers['Authorization']}, method: ${req.method}, url: ${req.url}, body: ${req.body}`
    );
  }
  next();
};
