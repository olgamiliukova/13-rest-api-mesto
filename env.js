const dotenv = require('dotenv');

const result = dotenv.config();

if (result.error) {
  throw result.error;
}

const { parsed: env } = result;

module.exports = (app) => {
  app.set('.env', env);

  return app;
};
