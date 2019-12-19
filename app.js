const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('./env');
const controllers = require('./controllers');
const models = require('./models');
const routes = require('./routes');
// Load available users from seeds
const users = require('./seeds/users.json');

// Create and extend application
const app = routes(
  controllers(
    models(
      dotenv(
        express(),
      ),
    ),
  ),
);
// Midlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Random user from seeds instead hardcode _id
const user = users[Math.floor(Math.random() * users.length)];
app.use((req, res, next) => {
  req.user = user;

  next();
});

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
