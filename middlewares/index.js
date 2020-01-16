const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const auth = require('./auth');
// Middlewars
module.exports = (app) => {
  app.use(cookieParser());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(auth(app));

  return app;
};
