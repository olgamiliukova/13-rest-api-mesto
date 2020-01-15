/* eslint-disable arrow-body-style */
const jwt = require('jsonwebtoken');
const ItemsController = require('./items');
/* eslint-disable no-underscore-dangle */
class UsersController extends ItemsController {
  login(req, res) {
    const { email, password } = req.body;

    return this.model.findUserByCredentials(email, password)
      .then((user) => {
        const { JWT_SECRET, JWT_EXPIRES_IN } = req.app.get('.env');
        const token = jwt.sign(
          { _id: user._id },
          JWT_SECRET,
          { expiresIn: JWT_EXPIRES_IN },
        );

        res
          .set({
            authorization: `Bearer ${token}`,
          })
          .cookie('jwt', token, {
            maxAge: 1000 * parseInt(JWT_EXPIRES_IN, 10),
            httpOnly: true,
          })
          .send({ token });
      })
      .catch((err) => {
        res
          .status(401)
          .send({ message: err.message });
      });
  }

  getMe(req, res) {
    const { _id } = req.user;

    return ItemsController._send(
      this._join(
        this.model.findById(_id),
      ),
      res,
    );
  }

  updateMe(req, res) {
    const { _id } = req.user;

    return ItemsController._send(
      this._join(
        this.model.findByIdAndUpdate(_id, this._data(req.body), { new: true }),
      ),
      res,
    );
  }
}

module.exports = (app) => {
  const { User } = app.get('models');
  return new UsersController(User);
};

module.exports.UsersController = UsersController;
