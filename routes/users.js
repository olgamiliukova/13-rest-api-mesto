const { Router } = require('express');
const {
  celebrate,
  Joi,
  Segments,
} = require('celebrate');

module.exports = (app) => {
  const router = Router();
  const { users } = app.get('controllers');
  const { User: validator } = app.get('validators');
  // Get user list
  router.get('/', users.getItems.bind(users));
  // Get yourself
  router.get('/me', users.getMe.bind(users));
  // Get user by id
  router.get('/:id', celebrate({
    [Segments.PARAMS]: Joi.object({
      id: Joi.string().alphanum().length(24),
    }),
  }), users.getItem.bind(users));
  // Create new user
  router.post('/', celebrate({
    [Segments.BODY]: validator,
  }), users.createUser.bind(users));
  // Update yourself
  router.patch('/me', celebrate({
    [Segments.BODY]: validator,
  }), users.updateMe.bind(users));
  // Update user by id
  router.put('/:id', celebrate({
    [Segments.PARAMS]: Joi.object({
      id: Joi.string().alphanum().length(24),
    }),
    [Segments.BODY]: validator,
  }), users.updateUser.bind(users));
  // Delete user by id
  router.delete('/:id', celebrate({
    [Segments.PARAMS]: Joi.object({
      id: Joi.string().alphanum().length(24),
    }),
  }), users.deleteUser.bind(users));

  return router;
};
