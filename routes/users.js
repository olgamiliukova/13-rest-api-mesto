const { Router } = require('express');

module.exports = (app) => {
  const router = Router();
  const { users } = app.get('controllers');

  router.get('/', users.getUsers);

  return router;
};
