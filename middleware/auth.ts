import config from 'config';
import { Request, Response, NextFunction } from 'express';

export default (req: Request, res: Response, next: NextFunction) => {
  const apiKey: string | string[] = req.headers.apikey!;

  if (apiKey !== config.get('apiKey'))
    return res.status(400).send({ status: false, message: 'Invalid API key' });

  next();
};
