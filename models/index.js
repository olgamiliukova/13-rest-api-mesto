const mongoose = require('mongoose');
// Mongodb models
const Card = require('./card');
const User = require('./user');
// Initialize connection and setup models
module.exports = (app) => {
  const {
    MONGODB_HOST: host,
    MONGODB_PORT: port,
    MONGODB_NAME: name,
  } = app.get('.env');
  mongoose
    .connect(`mongodb://${host}:${port}/${name}`, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
    })
    .catch((err) => {
      console.error(err);
    });

  app.set('models', { Card, User });

  return app;
};
