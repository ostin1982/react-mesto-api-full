const { JWT_SECRET = 'secret-key' } = process.env;

const jwt = require('jsonwebtoken');
const AuthenticationError = require('../errors/AuthenticationError');

const auth = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    throw new AuthenticationError('Необходима авторизация');
  }

  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    throw new AuthenticationError('Необходима авторизация ещё');
  }

  req.user = payload;
  next();
};

module.exports = auth;
