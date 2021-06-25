const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');

const User = require('../models/user');
const RegistrationError = require('../errors/RegistrationError');
const NotFoundError = require('../errors/NotFoundError');
const ValidationError = require('../errors/ValidationError');
const AuthenticationError = require('../errors/AuthenticationError');

dotenv.config();
const { NODE_ENV, JWT_SECRET } = process.env;

const getUsers = (req, res, next) => {
  User.find({})
    .then((user) => res.status(200).send(user))
    .catch(next);
};

const getProfile = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => {
      throw new NotFoundError('Карточки с такими данными не существует!');
    })
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.message === 'CastError') {
        throw new ValidationError('Ошибка в заполнении полей');
      }
      throw new NotFoundError('Карточки с такими данными не существует');
    })
    .catch(next);
};

const createProfile = (req, res, next) => {
  User.findById(req.params.id)
    .then(() => {
      throw new NotFoundError('Карточки с такими данными не существует!');
    })
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new ValidationError('Ошибка в заполнении полей');
      }
      throw new NotFoundError('Карточки с такими данными не существует');
    })
    .catch(next);
};

const updateProfile = (req, res, next) => {
  const { name, about } = req.body;
  if (!name || !about) {
    throw new ValidationError('Ошибка в заполнении полей');
  }
  User.findByIdAndUpdate(req.user._id, { name, about },
    {
      new: true,
      runValidators: true,
    })
    .orFail(() => {
      throw new NotFoundError('Карточки с такими данными не существует!');
    })
    .then((data) => res.status(200).send(data))
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        throw new ValidationError('Ошибка в заполнении полей');
      }
      throw new NotFoundError('Карточки с такими данными не существует!');
    })
    .catch(next);
};

const updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  if (!avatar) {
    throw new ValidationError('Ошибка в заполнении полей');
  }
  User.findByIdAndUpdate(req.user._id, { avatar },
    {
      new: true,
      runValidators: true,
    })
    .orFail(() => {
      throw new NotFoundError('Карточки с такими данными не существует!');
    })
    .then((data) => res.status(200).send(data))
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        throw new ValidationError('Ошибка в заполнении полей');
      }
      throw new NotFoundError('Карточки с такими данными не существует!');
    })
    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, `${NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret'}`, { expiresIn: '7d' });
      res.send({ token });
    })
    .catch(() => {
      throw new AuthenticationError('Данные не некорректны');
    })
    .catch(next);
};

const createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  if (!email || !password) {
    throw new AuthenticationError('Данные не некорректны');
  }
  bcrypt.hash(password, 10)
    .then((hash) => {
      User.create({
        name, about, avatar, email, password: hash,
      })
        .then((user) => res.status(200).send({
          _id: user._id,
          name: user.name,
          about: user.about,
          avatar: user.avatar,
          email: user.email,
        }))
        .catch((err) => {
          if (err.name === 'MongoError' || err.code === 11000) {
            throw new RegistrationError('Пользователь с этими данными уже зарегистрирован');
          } else if (err.name === 'ValidationError' || err.name === 'CastError') {
            throw new ValidationError('Ошибка в заполнении полей');
          }
        })
        .catch(next);
    });
};

module.exports = {
  getUsers, getProfile, createProfile, updateProfile, updateAvatar, login, createUser,
};
