const { JWT_SECRET } = process.env;

const jwt = require('jsonwebtoken');
const AuthenticationError = require('../errors/AuthenticationError');

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new AuthenticationError('Необходима авторизация!!!'));
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (e) {
    return next(new AuthenticationError('Необходима авторизация'));
  }

  req.user = payload;
  return next();
};

module.exports = auth;
