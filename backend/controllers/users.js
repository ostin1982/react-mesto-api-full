const { JWT_SECRET } = process.env;

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const User = require('../models/user');
const RegistrationError = require('../errors/RegistrationError');
const NotFoundError = require('../errors/NotFoundError');
const ValidationError = require('../errors/ValidationError');

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => {
      if (!users) {
        throw new NotFoundError('Карточки с такими данными не существует');
      }
      return res.status(200).send(users);
    })
    .catch(next);
};

const getProfile = (req, res, next) => {
  User.findById(req.params._id)
    .then((users) => {
      if (!users) {
        throw new NotFoundError('Карточки с такими данными не существует!');
      }
      return res.status(200).send(users);
    })
    .catch(next);
};

const createProfile = (req, res, next) => {
  User.findById(req.users)
    .then((users) => {
      if (!users) {
        throw new NotFoundError('Карточки с такими данными не существует');
      }
      res.status(200).send(users);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ValidationError('Ошибка в заполнении полей'));
      }
      next(err);
    });
};

const updateProfile = (req, res, next) => {
  const id = req.users;
  const { name, about } = req.body;

  User.findByIdAndUpdate(id, { name, about },
    {
      new: true,
      runValidators: true,
    })
    .then((users) => res.status(200).send(users))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new ValidationError('Ошибка в заполнении полей');
      }
    })
    .catch(next);
};

const updateAvatar = (req, res, next) => {
  const id = req.users;
  const { avatar } = req.body;

  User.findByIdAndUpdate(id, { avatar },
    {
      new: true,
      runValidators: true,
    })
    .then((users) => res.status(200).send(users))
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
    .then((users) => {
      const token = jwt.sign(
        { id: users._id },
        JWT_SECRET,
        { expiresIn: '7d' },
      );

      res.send({ token });
    })
    .catch(next);
};

const createUser = (req, res, next) => {
  const { body } = req;
  bcrypt.hash(body.password, 10)
    .then((hash) => User.create({ ...body, password: hash }))
    .then((users) => res.send({ data: `Пользователь ${users.email} создан` }))
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
