const { Router } = require('express');

module.exports = (app) => {
  const router = Router();
  const { users } = app.get('controllers');

  router.post('/signin', users.login.bind(users));
  router.post('/signup', users.createItem.bind(users));

  return router;
};
