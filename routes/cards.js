const { Router } = require('express');
const {
  celebrate,
  Joi,
  Segments,
} = require('celebrate');

module.exports = (app) => {
  const router = Router();
  const { cards } = app.get('controllers');
  const { Card: Validator } = app.get('validators');
  // Get card list
  router.get('/', cards.getItems.bind(cards));
  // Get card by id
  router.get('/:id', celebrate({
    [Segments.PARAMS]: Joi.object({
      id: Joi.string().alphanum().length(24),
    }),
  }), cards.getItem.bind(cards));
  // Create new card
  router.post('/', celebrate({
    [Segments.BODY]: Validator,
  }), cards.createCard.bind(cards));
  // Update card by id
  router.put('/:id', celebrate({
    [Segments.PARAMS]: Joi.object({
      id: Joi.string().alphanum().length(24),
    }),
    [Segments.BODY]: Validator,
  }), cards.updateItem.bind(cards));
  // Delete card by id
  router.delete('/:id', celebrate({
    [Segments.PARAMS]: Joi.object({
      id: Joi.string().alphanum().length(24),
    }),
  }), cards.deleteCard.bind(cards));
  // Like card
  router.put('/:id/likes', celebrate({
    [Segments.PARAMS]: Joi.object({
      id: Joi.string().alphanum().length(24),
    }),
  }), cards.likeCard.bind(cards));
  // Unlike card
  router.delete('/:id/likes', celebrate({
    [Segments.PARAMS]: Joi.object({
      id: Joi.string().alphanum().length(24),
    }),
  }), cards.dislikeCard.bind(cards));

  return router;
};
