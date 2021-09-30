import config from 'config';
import { Response } from 'express';

function validationErrors(res: Response, payload: any) {
  return res.status(422).json({
    status: false,
    error: payload
  });
}

function success(res: Response, msg = 'Operation successful') {
  return res.status(200).json({
    status: true,
    message: msg
  });
}

function withDataAndMsg(
  res: Response,
  msg = 'Operation successful',
  payload: any
) {
  return res.status(200).json({
    status: true,
    message: msg,
    data: payload
  });
}

function withData(res: Response, payload: any) {
  return res.status(200).json({
    status: true,
    data: payload
  });
}

function error(res: Response, msg = 'Error Occured', code = 400) {
  return res.status(code).json({
    status: false,
    message: msg
  });
}

function redirect(res: Response, url = config.get('appDomain'), msg = '') {
  return res.redirect(301, `${url}/?message=${msg}`);
}

export default {
  success,
  withData,
  withDataAndMsg,
  error,
  redirect,
  validationErrors
};
