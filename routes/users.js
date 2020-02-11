const { Router } = require('express');
const {
  celebrate,
  Joi,
  Segments,
} = require('celebrate');

module.exports = (app) => {
  const router = Router();
  const { users } = app.get('controllers');
  // Get user list
  router.get('/', users.getItems.bind(users));
  // Get yourself
  router.get('/me', users.getMe.bind(users));
  // Get user by id
  router.get('/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.objectId(),
    }),
  }), users.getItem.bind(users));
  // Create new user
  router.post('/', celebrate({
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
      name: Joi.string().required().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string().required().uri(),
    }),
  }), users.createUser.bind(users));
  // Update yourself
  router.patch('/me', celebrate({
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().email(),
      password: Joi.string().min(8),
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string().uri(),
    }),
  }), users.updateMe.bind(users));
  // Update user by id
  router.put('/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.objectId(),
    }),
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().email(),
      password: Joi.string().min(8),
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string().uri(),
    }),
  }), users.updateItem.bind(users));
  // Delete user by id
  router.delete('/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.objectId(),
    }),
  }), users.deleteItem.bind(users));

  return router;
};
