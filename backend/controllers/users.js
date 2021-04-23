const { JWT_SECRET } = process.env;

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const User = require('../models/user');
const RegistrationError = require('../errors/RegistrationError');
const NotFoundError = require('../errors/NotFoundError');
const ValidationError = require('../errors/ValidationError');

const getUsers = (req, res, next) => {
  User.findById({})
    .then((user) => {
      if (!user) {
        throw new NotFoundError('A card with such data does not exist');
      }
      return res.status(200).send(user);
    })
    .catch(next);
};

const getProfile = (req, res, next) => {
  const id = req.user._id;

  User.findById(id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('A card with such data does not exist!');
      }
      return res.status(200).send(user);
    })
    .catch(next);
};

const createProfile = (req, res, next) => User.findById(req.params.user._id)
  .then((user) => {
    if (!user) {
      throw new NotFoundError('A card with such data does not exist');
    }
    res.status(200).send(user);
  })
  .catch((err) => {
    if (err.name === 'CastError') {
      next(new ValidationError('Error in filling in the fields'));
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
        throw new ValidationError('Error in filling in the fields');
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
        throw new ValidationError('Error in filling in the fields');
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
        JWT_SECRET,
        { expiresIn: '7d' },
      );

      res.send({ token });
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
        throw new ValidationError('Error in filling in the fields');
      }
      throw new RegistrationError('The user with this data is already registered');
    })
    .catch(next);
};

module.exports = {
  getUsers, getProfile, createProfile, updateProfile, updateAvatar, login, createUser,
};
