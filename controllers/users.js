/* eslint-disable no-param-reassign */
/* eslint-disable arrow-body-style */
const jwt = require('jsonwebtoken');
const validator = require('validator');

const ItemsController = require('./items');
const {
  BadRequestError,
  ForbiddenError,
} = require('../errors');
/* eslint-disable no-underscore-dangle */
class UsersController extends ItemsController {
  login(req, res, next) {
    const { email, password } = req.body;

    if (!validator.isEmail(email)) {
      throw new BadRequestError('Validation: Field email is not correct');
    }

    return this.model.findUserByCredentials(email, password)
      .then((user) => {
        const { NODE_ENV, JWT_SECRET, JWT_EXPIRES_IN } = req.app.get('.env');
        const token = jwt.sign(
          { _id: user._id },
          NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
          { expiresIn: JWT_EXPIRES_IN },
        );

        res.set({
          authorization: `Bearer ${token}`,
        })
          .cookie('jwt', token, {
            maxAge: 1000 * parseInt(JWT_EXPIRES_IN, 10),
            httpOnly: true,
          })
          .send({ token });
      })
      .catch(next);
  }

  createUser(req, res, next) {
    const { email } = this._data(req.body);

    if (!email) {
      throw new BadRequestError('Field email is required');
    }

    return this.model.exists({ email })
      .then(
        (isExists) => {
          if (isExists) {
            throw new BadRequestError(`User with email "${email}" already exists`);
          }

          return this._send(
            this.model.create(this._data(req.body))
              .then(
                ({ _id }) => this.model.findById(_id),
              ),
            res,
          );
        },
      )
      .catch(next);
  }

  updateUser(req, res, next) {
    const { id } = req.params;

    if (req.user._id !== id) {
      throw new ForbiddenError('Operation "Update" is not permitted');
    }

    return this.updateItem(req, res, next);
  }

  deleteUser(req, res, next) {
    const { id } = req.params;

    if (req.user._id !== id) {
      throw new ForbiddenError('Operation "Delete" is not permitted');
    }

    return this.deleteItem(req, res, next);
  }

  getMe(req, res, next) {
    return this._send(
      this._join(
        this.model.findById(req.user._id),
      ),
      res,
    )
      .catch(next);
  }

  updateMe(req, res, next) {
    return this._send(
      this._join(
        this.model.findByIdAndUpdate(
          req.user._id,
          this._data(req.body),
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
  const { User } = app.get('models');
  return new UsersController(User);
};

module.exports.UsersController = UsersController;
