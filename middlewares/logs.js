const winston = require('winston');
const expressWinston = require('express-winston');

const createLogger = (filename, method = 'logger') => expressWinston[method]({
  transports: process.env.NODE_ENV === 'development' ? [
    new winston.transports.Console(),
  ] : [
    new winston.transports.File({ filename }),
  ],
  format: winston.format.json(),
});

module.exports = (app) => {
  app.set(
    'logger.error',
    createLogger(
      'logs/error.log',
      'errorLogger',
    ),
  );

  return createLogger('logs/request.log');
};
