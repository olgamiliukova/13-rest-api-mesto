const BadRequestError = require('./400');
const UnauthorizedError = require('./401');
const ForbiddenError = require('./403');
const NotFoundError = require('./404');
const InternalServerError = require('./500');

module.exports = (app) => {
  app.use((err, _, res, next) => {
    const { statusCode = InternalServerError.statusCode, message } = err;

    res
      .status(statusCode)
      .send({
        statusCode,
        message: statusCode === InternalServerError.statusCode
          ? InternalServerError.message
          : message,
      });

    next();
  });

  return app;
};

module.exports.BadRequestError = BadRequestError;
module.exports.UnauthorizedError = UnauthorizedError;
module.exports.ForbiddenError = ForbiddenError;
module.exports.NotFoundError = NotFoundError;
module.exports.InternalServerError = InternalServerError;
