const ItemsController = require('./items');
const {
  BadRequestError,
  ForbiddenError,
} = require('../errors');
/* eslint-disable no-underscore-dangle */
class CardsController extends ItemsController {
  createCard(req, res, next) {
    req.body.owner = {
      _id: req.user._id,
    };

    return this.createItem(req, res, next);
  }

  deleteCard(req, res, next) {
    const { id } = req.params;

    return this._join(this.model.findById(id))
      .then((card) => {
        if (!card || !card.owner) {
          throw new BadRequestError('Field owner is required');
        }

        if (req.user._id !== card.owner._id) {
          throw new ForbiddenError('Operation "Delete" is not permitted');
        }

        return this.deleteItem(req, res, next);
      })
      .catch(next);
  }

  likeCard(req, res, next) {
    const { id } = req.params;

    return this._send(
      this._join(
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
      ),
      res,
    )
      .catch(next);
  }

  dislikeCard(req, res, next) {
    const { id } = req.params;

    return this._send(
      this._join(
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
      ),
      res,
    )
      .catch(next);
  }
}

module.exports = (app) => {
  const { Card } = app.get('models');
  return new CardsController(Card, ['owner', 'likes']);
};

module.exports.CardsController = CardsController;
