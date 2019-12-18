const express = require('express');
const dotenv = require('./env');
const controllers = require('./controllers');
const models = require('./models');
const routes = require('./routes');

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

const { EXPRESS_PORT } = app.get('.env');
// Start and listen
app.listen(EXPRESS_PORT, () => {
  console.log(`App listening on port ${EXPRESS_PORT}`);
});
