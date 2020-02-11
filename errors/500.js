class InternalServerError extends Error {
  constructor(message = InternalServerError.message) {
    super(message);
    this.statusCode = InternalServerError.statusCode;
  }
}

InternalServerError.statusCode = 500;
InternalServerError.message = 'Internal Server Error';

module.exports = InternalServerError;
