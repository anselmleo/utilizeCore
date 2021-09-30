import dotenv from 'dotenv';
dotenv.config();

export default {
  environment: 'dev',
  appName: 'UtilizeCore Order API',
  appDomain: process.env.DEV_APP_DOMAIN,
  apiKey: process.env.API_KEY,
  dbConnString: process.env.DEV_DB_CONN_STRING,
  port: process.env.DEV_PORT,
  jwtAccessTokenPrivateKey: process.env.JWT_ACCESS_TOKEN_PRIVATE_KEY,
  jwtRefreshTokenPrivateKey: process.env.JWT_REFRESH_TOKEN_PRIVATE_KEY,
  requiresAuth: true,
  bcryptSalt: process.env.BCRYPT_SALT,
  mqConnUrl: process.env.MQ_CONN_URL
};
