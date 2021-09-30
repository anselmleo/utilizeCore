import config from 'config';
import http from 'http';
import express from 'express';
import winston from 'winston';
import logging from './startup/logging';
import logger from './startup/logger';
import db from './startup/db';
import cors from './startup/cors';
import routes from './startup/routes';

// connect db
db();

// create server
const app = express();
const server = http.createServer(app);

// log server status and error-handling
logging();

// log all http requests
app.use(logger);

// apply cors
cors(app);

// setup routes
routes(app);

const port = config.get('port');
server.listen(port, () => winston.info(`Listening on port ${port}...`));

export default server;
