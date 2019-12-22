// Routes
const cards = require('./cards');
const users = require('./users');
// Setup routes
module.exports = (app) => {
  app.use('/cards', cards(app));
  app.use('/users', users(app));
  app.use('/', (req, res) => {
    res.status(404);
    res.send({
      message: 'The requested resource is not found',
    });
  });

  return app;
};
