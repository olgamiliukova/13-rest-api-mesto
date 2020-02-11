const dotenv = require('dotenv');

let result = dotenv.config();

// fallback default config if .env doesn't exist(developer mode)
if (result.error) {
  result = {
    parsed: {
      EXPRESS_PORT: 3000,
      MONGODB_HOST: 'localhost',
      MONGODB_PORT: '27017',
      MONGODB_NAME: 'mestodb',
      MONGODB_SEED: true,
      NODE_ENV: process.env.NODE_ENV,
      JWT_SECRET: 'jwt-secret',
      // seconds, default 7d
      JWT_EXPIRES_IN: 604800,
    },
  };
}

const { parsed: env } = result;

module.exports = (app) => {
  app.set('.env', env);

  return app;
};
