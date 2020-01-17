const ItemsController = require('./items');
const { errors } = require('../helpers');
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

    return this._join(this.model.findById(id))
      .then((card) => {
        if (!card) {
          return this._send(
            Promise.resolve(card),
            res,
          );
        }

        if (!card.owner) {
          return this._send(
            Promise.reject(
              res.status(412).send({
                message: 'Field owner is required',
              }),
            ),
            res,
          );
        }

        if (req.user._id !== card.owner._id) {
          return this._send(
            Promise.reject(
              res.status(403).send({
                message: 'Operation "Delete" is not permitted',
              }),
            ),
            res,
          );
        }

        return this.deleteItem(req, res);
      })
      .catch(
        (err) => errors(err, res),
      );
  }

  likeCard(req, res) {
    return this._send(
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
    return this._send(
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
