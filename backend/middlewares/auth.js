const jwt = require('jsonwebtoken');
const AuthenticationError = require('../errors/AuthenticationError');

const { NODE_ENV, JWT_SECRET } = process.env;

// eslint-disable-next-line no-unused-vars
const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new AuthenticationError('Необходима авторизация'));
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'my-secret');
  } catch (err) {
    return next(new AuthenticationError('Необходима авторизация'));
  }

  req.user = payload;
  next();
};

module.exports = auth;
