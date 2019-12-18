const { Router } = require('express');

module.exports = (app) => {
  const router = Router();
  const { cards } = app.get('controllers');

  router.get('/', cards.getCards);

  return router;
};
