const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const User = require('../models/user');
const RegistrationError = require('../errors/RegistrationError');
const NotFoundError = require('../errors/NotFoundError');
const ValidationError = require('../errors/ValidationError');

const { JWT_SECRET = 'my-little-secret' } = process.env;

const getUsers = (req, res, next) => User.find({})
  .orFail(() => {
    throw new NotFoundError('Нет такого пользователя');
  })
  .then((users) => res.send(users))
  .catch(next);

const getProfile = (req, res, next) => {
  const {
    email, password,
  } = req.body;
  User.findById(req.params._id)
    .orFail((err) => {
      if (err.name === 'ValidationError') {
        throw new ValidationError('Ошибка в заполнении полей');
      }
      throw new RegistrationError(`${email} или ${password} уже используется`);
    })
    .then((user) => res.status(200).send(user))
    .catch(next);
};

const createProfile = (req, res, next) => User.findById(req.user._id)
  .orFail(() => {
    throw new ValidationError('Ошибка в заполнении полей');
  })
  .then((user) => res.status(200).send(user))
  .catch(next);

const updateProfile = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .orFail((err) => {
      if (err.name === 'ValidationError') {
        throw new ValidationError('Ошибка в заполнении полей');
      }
    })
    .then((user) => res.status(200).send(user))
    .catch(next);
};

const updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .orFail(() => {
      throw new ValidationError('Ошибка в заполнении поля');
    })
    .then((user) => res.status(200).send(user))
    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: '7d',
      });
      res.send({ token });
    })
    .catch(() => {
      throw new NotFoundError('Нет такого пользователя');
    })
    .catch(next);
};

const createUser = (req, res, next) => {
  const { body } = req;
  bcrypt.hash(body.password, 10)
    .then((hash) => User.create({ ...body, password: hash }))
    .then((user) => res.send({ data: `Пользователь ${user.email} создан` }))
    .catch((err) => RegistrationError(err, next));
};

module.exports = {
  getUsers, getProfile, createProfile, updateProfile, updateAvatar, login, createUser,
};
