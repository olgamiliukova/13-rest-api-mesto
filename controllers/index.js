const cards = require('./cards');
const users = require('./users');
// Setup controllers
module.exports = (app) => {
  app.set('controllers', {
    cards: cards(app),
    users: users(app),
  });

  return app;
};
