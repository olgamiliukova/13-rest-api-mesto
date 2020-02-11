class BadRequestError extends Error {
  constructor(message = BadRequestError.message) {
    super(message);
    this.statusCode = BadRequestError.statusCode;
  }
}

BadRequestError.statusCode = 400;
BadRequestError.message = 'Bad Request';

module.exports = BadRequestError;
