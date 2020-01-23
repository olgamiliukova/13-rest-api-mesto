const express = require('express');
const mongoose = require('mongoose');

const dotenv = require('./env');
const controllers = require('./controllers');
const middlewares = require('./middlewares');
const models = require('./models');
const routes = require('./routes');

// Create and decorate application
const app = [
  dotenv,
  models,
  controllers,
  middlewares,
  routes,
].reduce(
  (decorated, decorator) => decorator(decorated),
  express(),
);

const {
  EXPRESS_PORT,
  MONGODB_HOST,
  MONGODB_PORT,
  MONGODB_NAME,
} = app.get('.env');
// Connect to MongoDB
mongoose
  .connect(`mongodb://${MONGODB_HOST}:${MONGODB_PORT}/${MONGODB_NAME}`, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .catch((err) => {
    console.error(err);
  });

// Start and listen
app.listen(EXPRESS_PORT, () => {
  console.log(`App listening on port ${EXPRESS_PORT}`);
});
