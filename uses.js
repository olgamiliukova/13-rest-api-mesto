const bodyParser = require('body-parser');
// Load available users from seeds
const users = require('./seeds/users.json');
// Middlewars
module.exports = (app) => {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  // Random user from seeds instead hardcode _id
  const user = users[Math.floor(Math.random() * users.length)];
  app.use((req, res, next) => {
    req.user = user;
    next();
  });

  return app;
};
