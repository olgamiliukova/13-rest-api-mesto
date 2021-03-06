const { Router } = require('express');
const {
  celebrate,
  Joi,
  Segments,
} = require('celebrate');

module.exports = (app) => {
  const router = Router();
  const { cards } = app.get('controllers');
  // Get card list
  router.get('/', cards.getItems.bind(cards));
  // Get card by id
  router.get('/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.objectId(),
    }),
  }), cards.getItem.bind(cards));
  // Create new card
  router.post('/', celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      link: Joi.string().required().uri(),
    }),
  }), cards.createCard.bind(cards));
  // Update card by id
  router.put('/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.objectId(),
    }),
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      link: Joi.string().uri(),
    }),
  }), cards.updateItem.bind(cards));
  // Delete card by id
  router.delete('/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.objectId(),
    }),
  }), cards.deleteItem.bind(cards));
  // Like card
  router.put('/:id/likes', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.objectId(),
    }),
  }), cards.likeCard.bind(cards));
  // Unlike card
  router.delete('/:id/likes', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.objectId(),
    }),
  }), cards.unlikeCard.bind(cards));

  return router;
};
