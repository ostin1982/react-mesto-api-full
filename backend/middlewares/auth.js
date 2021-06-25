const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const AuthenticationError = require('../errors/AuthenticationError');

dotenv.config();

const { JWT_SECRET, NODE_ENV } = process.env;

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new AuthenticationError('Необходима авторизация!');
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, `${NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret'}`);
  } catch (err) {
    throw new AuthenticationError('Необходима авторизацияqq');
  }

  req.user = payload;
  next();
};

module.exports = auth;
