// Errors
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

  return app;
};
