const jwt = require('jsonwebtoken');
const {
  celebrate,
  Joi,
  Segments,
} = require('celebrate');

const { UnauthorizedError } = require('../errors');

module.exports = (app) => {
  // required is to add signup/signin routes before authorization middleware
  const { users } = app.get('controllers');

  app.post('/signup', celebrate({
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
      name: Joi.string().required().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string().required().uri(),
    }),
  }), users.createUser.bind(users));
  app.post('/signin', celebrate({
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
    }),
  }), users.login.bind(users));

  // eslint-disable-next-line consistent-return
  return (req, _, next) => {
    let { authorization } = req.headers;

    if (!authorization || !authorization.startsWith('Bearer ')) {
      const { jwt: token } = req.cookies;

      if (!token) {
        throw new UnauthorizedError();
      }

      authorization = token;
    }

    const token = authorization.replace('Bearer ', '');
    const { NODE_ENV, JWT_SECRET } = req.app.get('.env');

    try {
      req.user = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
    } catch (e) {
      throw new UnauthorizedError(e.message);
    }

    next();
  };
};
