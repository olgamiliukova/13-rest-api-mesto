const { NotFoundError } = require('../errors');
/* eslint-disable no-underscore-dangle */
module.exports = class ItemsController {
  constructor(model, joins = []) {
    this.model = model;
    this.joins = joins;
  }

  _data(data) {
    return Object.keys(this.model.schema.obj).reduce(
      (obj, key) => (key in data ? { ...obj, [key]: data[key] } : obj),
      {},
    );
  }

  _join(promise) {
    this.joins.forEach(
      (field) => promise.populate(field),
    );

    return promise;
  }

  _check(req, action) {
    const { id } = req.params;

    return this.model.exists({ _id: id })
      .then(
        (isExist) => {
          if (!isExist) {
            throw new NotFoundError(`${this.model.modelName} has not been found to ${action}`);
          }

          return { req, action };
        },
      );
  }

  _send(res, status = 200) {
    return (result) => {
      if (!result) {
        throw new NotFoundError(`${this.model.modelName}(s) has(ve) not been found`);
      }

      return res
        .status(status)
        .send(result);
    };
  }

  getItems(_, res, next) {
    return this._join(
      this.model.find({}),
    )
      .then(this._send(res))
      .catch(next);
  }

  getItem(req, res, next) {
    const { id } = req.params;

    return this._join(
      this.model.findById(id),
    )
      .then(this._send(res))
      .catch(next);
  }

  createItem(req, res, next) {
    return this.model.create(this._data(req.body))
      .then(
        ({ _id }) => this.model.findById(_id),
      )
      .then(this._send(res, 201))
      .catch(next);
  }

  updateItem(req, res, next) {
    const { id } = req.params;

    return this._check(req, 'update')
      .then(
        () => this._join(
          this.model.findByIdAndUpdate(
            id,
            this._data(req.body),
            {
              new: true,
              runValidators: true,
            },
          ),
        ),
      )
      .then(this._send(res))
      .catch(next);
  }

  deleteItem(req, res, next) {
    const { id } = req.params;

    return this._check(req, 'delete')
      .then(
        () => this._join(
          this.model.findByIdAndRemove(id),
        ),
      )
      .then(this._send(res))
      .catch(next);
  }
};
