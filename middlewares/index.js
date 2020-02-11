const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');

const auth = require('./auth');
const logs = require('./logs');
// Middlewars
module.exports = (app) => {
  app.use(cors());
  app.use(helmet());
  app.use(cookieParser());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(logs(app));
  app.use(auth(app));

  return app;
};
