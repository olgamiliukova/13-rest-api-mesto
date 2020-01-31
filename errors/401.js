class UnauthorizedError extends Error {
  constructor(message = UnauthorizedError.message) {
    super(message);
    this.statusCode = UnauthorizedError.statusCode;
  }
}

UnauthorizedError.statusCode = 401;
UnauthorizedError.message = 'Unauthorized';

module.exports = UnauthorizedError;
