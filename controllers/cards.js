const ItemsController = require('./items');
/* eslint-disable no-underscore-dangle */
class CardsController extends ItemsController {
  likeCard(req, res) {
    return super._send(
      this.model.findByIdAndUpdate(
        req.params.id,
        { $addToSet: { likes: req.user._id } },
        { new: true },
      ),
      res,
    );
  }

  dislikeCard(req, res) {
    return super._send(
      this.model.findByIdAndUpdate(
        req.params.cardId,
        { $pull: { likes: req.user._id } },
        { new: true },
      ),
      res,
    );
  }
}

module.exports = (app) => {
  const { Card } = app.get('models');
  return new CardsController(Card, ['owner', 'likes']);
};

module.exports.CardsController = CardsController;
