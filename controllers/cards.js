const ItemsController = require('./items');
/* eslint-disable no-underscore-dangle */
class CardsController extends ItemsController {
  createCard(req, res) {
    req.body.owner = {
      _id: req.user._id,
    };

    return this.createItem(req, res);
  }

  deleteCard(req, res) {
    const { id } = req.params;

    return this._join(
      this.model.findById(id),
    ).then(({ owner }) => {
      if (req.user._id !== owner._id) {
        return ItemsController._send(
          // eslint-disable-next-line prefer-promise-reject-errors
          Promise.reject(() => res.status(403).send({
            message: 'Operation "Delete" is not permitted',
          })),
          res,
        );
      }

      return this.deleteItem(req, res);
    });
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
