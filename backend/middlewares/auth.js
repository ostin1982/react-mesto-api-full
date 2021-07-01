const { NODE_ENV, JWT_SECRET } = process.env;

const jwt = require('jsonwebtoken');
const AuthenticationError = require('../errors/AuthenticationError');

const auth = (req, res, next) => {
  const authorization = req.cookies.jwt;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new AuthenticationError('Необходима авторизация!');
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    throw new AuthenticationError('Необходима авторизация');
  }

  req.user = { _id: payload._id };
  next();
};

module.exports = auth;
