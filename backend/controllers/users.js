const { NODE_ENV, JWT_SECRET } = process.env;

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const User = require('../models/user');
const RegistrationError = require('../errors/RegistrationError');
const NotFoundError = require('../errors/NotFoundError');
const AuthenticationError = require('../errors/AuthenticationError');
const ValidationError = require('../errors/ValidationError');

const getUsers = (req, res, next) => {
  User.findById({})
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Нет карточки с такими данными');
      }
      return res.status(200).send({ data: user });
    })
    .catch(next);
};

const getProfile = (req, res, next) => {
  const { _id } = req.params;

  User.findById({ _id })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Нет карточки с такими данными!');
      }
      res.send(user);
    })
    .catch(next);
};

const createProfile = (req, res, next) => User.findById(req.params.user._id)
  .then((user) => {
    if (!user) {
      throw new NotFoundError('Нет карточки с такими данными');
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
  const { _id } = req.user;
  const { name, about } = req.body;

  User.findByIdAndUpdate(_id, { name, about },
    {
      new: true,
      runValidators: true,
    })
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new ValidationError('Ошибка в заполнении полей');
      }
    })
    .catch(next);
};

const updateAvatar = (req, res, next) => {
  const { _id } = req.user;
  const { avatar } = req.body;

  User.findByIdAndUpdate(_id, { avatar },
    {
      new: true,
      runValidators: true,
    })
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new ValidationError('Ошибка в заполнении полей');
      }
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

      res.status(200).send({ token });
    })
    .catch(() => {
      throw new AuthenticationError('Необходима авторизация');
    })
    .catch(next);
};

const createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((user) => res.status(200).send({
      name: user.name,
      about: user.about,
      avatar: user.avatar,
      email: user.email,
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new ValidationError('Ошибка в заполнении полей');
      }
      throw new RegistrationError('Пользователь с такими данными уже зарегистирирован');
    })
    .catch(next);
};

module.exports = {
  getUsers, getProfile, createProfile, updateProfile, updateAvatar, login, createUser,
};
