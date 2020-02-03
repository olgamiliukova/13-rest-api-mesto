const ItemsController = require('./items');
const {
  NotFoundError,
  ForbiddenError,
} = require('../errors');
/* eslint-disable no-underscore-dangle */
class CardsController extends ItemsController {
  _check(req, action) {
    const { id } = req.params;

    return super._check(req, action)
      .then(
        () => this._join(
          this.model.findById(id),
        ),
      )
      .then(
        (card) => {
          if (!card.owner) {
            throw new NotFoundError('Owner of the card has not been found');
          }

          if (!card.owner.equals(req.user)) {
            throw new ForbiddenError(`Operation "${action}" is not permitted`);
          }

          return card;
        },
      );
  }

  createCard(req, res, next) {
    req.body.owner = req.user;

    return this.createItem(req, res, next);
  }

  likeCard(req, res, next) {
    const { id } = req.params;

    return this._join(
      this.model.findByIdAndUpdate(
        id,
        {
          $addToSet: {
            likes: req.user._id,
          },
        },
        {
          new: true,
          runValidators: true,
        },
      ),
    )
      .then(this._send(res))
      .catch(next);
  }

  unlikeCard(req, res, next) {
    const { id } = req.params;

    return this._join(
      this.model.findByIdAndUpdate(
        id,
        {
          $pull: {
            likes: req.user._id,
          },
        },
        {
          new: true,
          runValidators: true,
        },
      ),
    )
      .then(this._send(res))
      .catch(next);
  }
}

module.exports = (app) => {
  const { Card } = app.get('models');
  return new CardsController(Card, ['owner', 'likes']);
};

module.exports.CardsController = CardsController;
