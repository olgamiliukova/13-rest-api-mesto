/* eslint-disable arrow-body-style */
const ItemsController = require('./items');
/* eslint-disable no-underscore-dangle */
class UsersController extends ItemsController {
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
