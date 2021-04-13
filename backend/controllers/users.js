const { NODE_ENV, JWT_SECRET } = process.env;

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const User = require('../models/user');
const RegistrationError = require('../errors/RegistrationError');
const NotFoundError = require('../errors/NotFoundError');
const AuthenticationError = require('../errors/AuthenticationError');
const ValidationError = require('../errors/ValidationError');

const getUsers = (req, res, next) => User.findById(req.user._id)
  .then((user) => {
    if (!user) {
      throw new NotFoundError('Нет пользователя с таким id');
    }
    return res.status(200).send({ data: user });
  })
  .catch(next);

const getProfile = (req, res, next) => {
  User.find({})
    .then((users) => {
      if (!users) {
        throw new NotFoundError('Нет пользователя с таким id');
      }
      res.status(200).send(users);
    })
    .catch(next);
};

const createProfile = (req, res, next) => User.findById(req.params.userId)
  .then((user) => {
    if (!user) {
      throw new NotFoundError('Нет пользователя с таким id');
    }
    res.status(200).send(user);
  })
  .catch((err) => {
    if (err.name === 'CastError') {
      next(new ValidationError('Ошибка в заполнении полей'));
    }
    next(err);
  });

const updateProfile = (req, res, next) => {
  User.findByIdAndUpdate(req.user._id, { name: req.body.name, about: req.body.about },
    { runValidators: true })
    .then((user) => {
      if (!user) {
        throw new ValidationError('Ошибка в заполнении полей');
      }
      res.status(200).send({ data: user });
    })
    .catch(next);
};

const updateAvatar = (req, res, next) => {
  User.findByIdAndUpdate(req.user._id,
    { avatar: req.body.avatar }, { runValidators: true })
    .then((user) => {
      if (!user) {
        throw new ValidationError('Ошибка в заполнении полей');
      }
      res.status(200).send({ data: user });
    })
    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' },
      );

      res.send({ jwt: token });
    })
    .catch((err) => {
      if (err.name === 'Error') {
        next(new AuthenticationError('Необходима авторизация'));
      } else {
        next(err);
      }
    });
};

const createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((user) => res.status(200).send({ mail: user.email }))
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        throw new AuthenticationError('Необходима авторизация');
      }
      if (err.name === 'MongoError' || err.code === '11000') {
        throw new RegistrationError('Пользователь с такими данными уже зарегистирирован');
      }
    })
    .catch(next);
};

module.exports = {
  getUsers, getProfile, createProfile, updateProfile, updateAvatar, login, createUser,
};
