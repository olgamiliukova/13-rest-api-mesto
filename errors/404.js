class NotFoundError extends Error {
  constructor(message = NotFoundError.message) {
    super(message);
    this.statusCode = NotFoundError.statusCode;
  }
}

NotFoundError.statusCode = 404;
NotFoundError.message = 'Not Found';

module.exports = NotFoundError;
