const { NotFoundError } = require('../errors');
/* eslint-disable no-underscore-dangle */
module.exports = class ItemsController {
  constructor(model, joins = []) {
    this.model = model;
    this.joins = joins;
  }

  _send(promise, res) {
    return promise.then(
      (result) => {
        if (!result) {
          throw new NotFoundError(`${this.model.modelName}(s) is not found`);
        }

        return res.send(result);
      },
    );
  }

  _data(data) {
    // eslint-disable-next-line arrow-body-style
    return Object.keys(this.model.schema.obj).reduce((obj, key) => {
      return key in data ? { ...obj, [key]: data[key] } : obj;
    }, {});
  }

  _join(promise) {
    this.joins.forEach(
      (field) => promise.populate(field),
    );

    return promise;
  }

  getItems(req, res, next) {
    return this._send(
      this._join(
        this.model.find({}),
      ),
      res,
    )
      .catch(next);
  }

  getItem(req, res, next) {
    const { id } = req.params;

    return this._send(
      this._join(
        this.model.findById(id),
      ),
      res,
    )
      .catch(next);
  }

  createItem(req, res, next) {
    return this._send(
      this.model.create(this._data(req.body)),
      res,
    )
      .catch(next);
  }

  updateItem(req, res, next) {
    const { id } = req.params;

    return this._send(
      this._join(
        this.model.findByIdAndUpdate(
          id,
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

  deleteItem(req, res, next) {
    const { id } = req.params;

    return this._send(
      this._join(
        this.model.findByIdAndDelete(id),
      ),
      res,
    )
      .catch(next);
  }
};
