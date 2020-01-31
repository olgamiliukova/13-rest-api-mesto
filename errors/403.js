class ForbiddenError extends Error {
  constructor(message = ForbiddenError.message) {
    super(message);
    this.statusCode = ForbiddenError.statusCode;
  }
}

ForbiddenError.statusCode = 403;
ForbiddenError.message = 'Forbidden';

module.exports = ForbiddenError;
