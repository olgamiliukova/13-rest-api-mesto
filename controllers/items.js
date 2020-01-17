const { errors } = require('../helpers');
/* eslint-disable no-underscore-dangle */
module.exports = class ItemsController {
  constructor(model, joins = []) {
    this.model = model;
    this.joins = joins;
  }

  _send(promise, res) {
    return promise
      .then(
        (result) => (result ? res.send(result) : Promise.reject(
          res.status(404).send({
            message: `${this.model.modelName}(s) is not found`,
          }),
        )),
      )
      .catch(
        (err) => errors(err, res),
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

  getItems(req, res) {
    return this._send(
      this._join(
        this.model.find({}),
      ),
      res,
    );
  }

  getItem(req, res) {
    const { id } = req.params;

    return this._send(
      this._join(
        this.model.findById(id),
      ),
      res,
    );
  }

  createItem(req, res) {
    return this._send(
      this.model.create(this._data(req.body)),
      res,
    );
  }

  updateItem(req, res) {
    const { id } = req.params;

    return this._send(
      this._join(
        this.model.findByIdAndUpdate(
          id,
          this._data(req.body),
          { new: true },
        ),
      ),
      res,
    );
  }

  deleteItem(req, res) {
    const { id } = req.params;

    return this._send(
      this._join(
        this.model.findByIdAndDelete(id),
      ),
      res,
    );
  }
};
