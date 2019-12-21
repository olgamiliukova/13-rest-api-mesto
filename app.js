const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('./env');
const controllers = require('./controllers');
const models = require('./models');
const routes = require('./routes');
const middlewars = require('./uses');

// Create and extend application
const app = routes(
  middlewars(
    controllers(
      models(
        dotenv(
          express(),
        ),
      ),
    ),
  ),
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
