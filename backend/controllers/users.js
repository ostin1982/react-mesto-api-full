const { NODE_ENV, JWT_SECRET } = process.env;

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const User = require('../models/user');
const RegistrationError = require('../errors/RegistrationError');
const NotFoundError = require('../errors/NotFoundError');
const ValidationError = require('../errors/ValidationError');

const getUsers = (req, res, next) => {
  User.find({})
    .then((user) => res.send(user))
    .catch(next);
};

const getProfile = (req, res, next) => {
  const { _id } = req.user;

  User.findById(_id)
    .orFail(new Error('NotFound'))
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.message === 'NotFound') {
        throw new NotFoundError('Карточки с такими данными не существует');
      }
    })
    .catch(next);
};

const createProfile = (req, res, next) => {
  const { userId } = req.params;

  User.findById(userId)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Карточки с такими данными не существует!');
      }
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ValidationError('Ошибка в заполнении полей'));
      }
      next(err);
    });
};

const updateProfile = (req, res, next) => {
  const { name, about } = req.body;
  const { _id } = req.user;

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
  const { avatar } = req.body;
  const { _id } = req.user;

  User.findByIdAndUpdate(_id, { avatar },
    {
      new: true,
      runValidators: true,
      upsert: false,
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
      const { _id } = user;
      const token = jwt.sign(
        { _id },
        NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key',
        { expiresIn: '7d' },
      );
      res.cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
        sameSite: 'none',
        secure: true,
      }).send({ tokenStatus: 'ok' });
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
    .then((user) => res.send({ data: `Пользователь ${user.email} создан` }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new ValidationError('Ошибка в заполнении полей');
      }
      throw new RegistrationError('Пользователь с этими данными уже зарегистрирован');
    })
    .catch(next);
};

module.exports = {
  getUsers, getProfile, createProfile, updateProfile, updateAvatar, login, createUser,
};
