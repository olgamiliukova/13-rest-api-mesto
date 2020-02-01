// Errors
const { errors } = require('celebrate');

const { NotFoundError } = require('../errors');
// Routes
const cards = require('./cards');
const users = require('./users');
// Setup routes
module.exports = (app) => {
  app.use('/cards', cards(app));
  app.use('/users', users(app));
  app.use('/', (_, res, next) => {
    next(new NotFoundError('The requested resource is not found'));
  });

  // Add error logger
  app.use(app.get('logger.error'));
  // Add validation errors middleware
  app.use(errors());

  return app;
};
