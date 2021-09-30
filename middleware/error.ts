import { error } from 'winston';
import { Request, Response, NextFunction } from 'express';

export default function (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  error(err.message, err);

  // error
  // warn
  // info
  // verbose
  // debug
  // silly

  res
    .status(500)
    .send({
      status: false,
      message: 'Something failed. Please try again in a few'
    });
}
