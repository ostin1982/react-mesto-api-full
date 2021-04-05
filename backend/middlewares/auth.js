const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/config');
const AuthenticationError = require('../errors/AuthenticationError');

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    throw new AuthenticationError('Необходима авторизация');
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    throw new AuthenticationError('Необходима авторизация');
  }

  req.user = payload;

  next();
};

module.exports = auth;
