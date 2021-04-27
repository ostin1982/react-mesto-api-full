const { JWT_SECRET } = process.env;

const jwt = require('jsonwebtoken');
const AuthenticationError = require('../errors/AuthenticationError');

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    throw new AuthenticationError('Необходима авторизация!');
  }

  const token = authorization.replace('Bearer ', '');

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
  } catch (err) {
    throw new AuthenticationError('Необходима авторизация');
  }

  next();
};

module.exports = auth;
