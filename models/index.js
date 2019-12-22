// Mongodb models
const Card = require('./card');
const User = require('./user');
// Initialize connection and setup models
module.exports = (app) => {
  app.set('models', { Card, User });

  return app;
};
