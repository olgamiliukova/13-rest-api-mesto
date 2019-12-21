const ItemsController = require('./items');
/* eslint-disable no-underscore-dangle */
class CardsController extends ItemsController {
  createCard(req, res) {
    req.body.owner = {
      _id: req.user._id,
    };

    return this.createItem(req, res);
  }

  likeCard(req, res) {
    return ItemsController._send(
      this._join(
        this.model.findByIdAndUpdate(
          req.params.id,
          { $addToSet: { likes: req.user._id } },
          { new: true },
        ),
      ),
      res,
    );
  }

  dislikeCard(req, res) {
    return ItemsController._send(
      this._join(
        this.model.findByIdAndUpdate(
          req.params.id,
          { $pull: { likes: req.user._id } },
          { new: true },
        ),
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
