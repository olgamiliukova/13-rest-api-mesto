/* eslint-disable no-underscore-dangle */
module.exports = class ItemsController {
  constructor(model, joins = []) {
    this.model = model;
    this.joins = joins;
  }

  static _send(promise, res) {
    return promise
      .then(
        // eslint-disable-next-line prefer-promise-reject-errors
        (result) => (result ? res.send(result) : Promise.reject(() => res.status(404).send({
          message: 'Not Found',
        }))),
      )
      .catch(
        (err) => (typeof err === 'function' ? err.call() : res.status(500).send({
          message: err.message,
        })),
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
    return ItemsController._send(
      this._join(
        this.model.find({}),
      ),
      res,
    );
  }

  getItem(req, res) {
    const { id } = req.params;

    return ItemsController._send(
      this._join(
        this.model.findById(id),
      ),
      res,
    );
  }

  createItem(req, res) {
    return ItemsController._send(
      this.model.create(this._data(req.body)),
      res,
    );
  }

  updateItem(req, res) {
    const { id } = req.params;

    return ItemsController._send(
      this._join(
        this.model.findByIdAndUpdate(id, this._data(req.body), { new: true }),
      ),
      res,
    );
  }

  deleteItem(req, res) {
    const { id } = req.params;

    return ItemsController._send(
      this._join(
        this.model.findByIdAndDelete(id),
      ),
      res,
    );
  }
};
