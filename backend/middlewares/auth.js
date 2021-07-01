const jwt = require('jsonwebtoken');
const AuthenticationError = require('../errors/AuthenticationError');

const { NODE_ENV, JWT_SECRET } = process.env;

const auth = (req, res, next) => {
  try {
    req.user = jwt.verify(req.cookies.jwt, NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key');
    next();
  } catch (err) {
    throw new AuthenticationError('Необходима авторизация');
  }

  next();
};

module.exports = auth;
