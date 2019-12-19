/* eslint-disable no-underscore-dangle */
module.exports = class ItemsController {
  constructor(model, loads = []) {
    this.model = model;
    this.loads = loads;
  }

  static _send(promise, res) {
    return promise
      .then((result) => res.send(result))
      .catch((err) => res.status(500).send({ message: err.message }));
  }

  _load(promise) {
    this.loads.forEach((field) => promise.populate(field));

    return promise;
  }

  getItems(req, res) {
    return ItemsController._send(
      this._load(
        this.model.find({}),
      ),
      res,
    );
  }

  getItem(req, res) {
    const { id } = req.params;

    return ItemsController._send(
      this._load(
        this.model.findById(id),
      ),
      res,
    );
  }

  createItem(req, res) {
    return ItemsController._send(
      this.model.create(req.body),
      res,
    );
  }

  updateItem(req, res) {
    const { id } = req.params;

    return ItemsController._send(
      this.model.findByIdAndUpdate(id, req.body),
      res,
    );
  }

  deleteItem(req, res) {
    const { id } = req.params;

    return ItemsController._send(
      this.model.findByIdAndDelete(id),
      res,
    );
  }
};
