const { Router } = require('express');

module.exports = (app) => {
  const router = Router();
  const { users } = app.get('controllers');

  router.get('/', users.getItems.bind(users));
  router.get('/me', users.getMe.bind(users));
  router.get('/:id', users.getItem.bind(users));
  router.post('/', users.createItem.bind(users));
  router.patch('/me', users.updateMe.bind(users));
  router.put('/:id', users.updateUser.bind(users));
  router.delete('/:id', users.deleteUser.bind(users));

  return router;
};
