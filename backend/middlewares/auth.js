const jwt = require('jsonwebtoken');
const AuthenticationError = require('../errors/AuthenticationError');

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new AuthenticationError('Необходима авторизация!');
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    throw new AuthenticationError('Необходима авторизация');
  }

  req.user = payload;
  next();
};

module.exports = auth;
