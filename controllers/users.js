const ItemsController = require('./items');
/* eslint-disable no-underscore-dangle */
class UsersController extends ItemsController {
  getMe(req, res) {
    const { _id } = req.user;

    return super._send(
      this.model.findById(_id),
      res,
    );
  }

  updateMe(req, res) {
    const { _id } = req.user;
    const body = { ...req.body };
    // eslint-disable-next-line no-shadow
    const fields = ['name', 'about', 'avatar'].reduce((fields, key) => {
      if (body[key]) {
        // eslint-disable-next-line no-param-reassign
        fields = { ...fields, [key]: body[key] };
      }

      return fields;
    }, {});

    return super._send(
      this.model.findByIdAndUpdate(_id, fields),
      res,
    );
  }
}

module.exports = (app) => {
  const { User } = app.get('models');
  return new UsersController(User);
};

module.exports.UsersController = UsersController;
