const jwt = require('jsonwebtoken');

module.exports = (app) => {
  // required is to add signup/signin routes before authorization middleware
  const { users } = app.get('controllers');

  app.post('/signup', users.createUser.bind(users));
  app.post('/signin', users.login.bind(users));

  // eslint-disable-next-line consistent-return
  return (req, res, next) => {
    let { authorization } = req.headers;

    if (!authorization || !authorization.startsWith('Bearer ')) {
      const { jwt: token } = req.cookies;

      if (!token) {
        return res
          .status(401)
          .send({ message: 'Authorization is required' });
      }

      authorization = token;
    }

    const token = authorization.replace('Bearer ', '');
    const { NODE_ENV, JWT_SECRET } = req.app.get('.env');

    try {
      req.user = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
    } catch (err) {
      return res
        .status(401)
        .send({ message: 'Authorization is required' });
    }

    next();
  };
};
