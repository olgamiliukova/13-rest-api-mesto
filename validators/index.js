// Joi validators
const Card = require('./card');
const User = require('./user');
// Setup validators
module.exports = (app) => {
  app.set('validators', { Card, User });

  return app;
};
