const { Router } = require('express');

module.exports = (app) => {
  const router = Router();
  const { cards } = app.get('controllers');

  router.get('/', cards.getItems.bind(cards));
  router.get('/:id', cards.getItem.bind(cards));
  router.post('/', cards.createCard.bind(cards));
  router.put('/:id', cards.updateItem.bind(cards));
  router.delete('/:id', cards.deleteItem.bind(cards));
  router.put('/:id/likes', cards.likeCard.bind(cards));
  router.delete('/:id/likes', cards.dislikeCard.bind(cards));

  return router;
};
