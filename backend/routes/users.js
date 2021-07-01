const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const cookieParser = require('cookie-parser');

const {
  getUsers, createProfile, getProfile, updateProfile, updateAvatar,
} = require('../controllers/users');

router.get('/users', cookieParser(), getUsers);

router.get('/users/me', cookieParser(), getProfile);

router.get('/users/:userId', cookieParser(), celebrate({
  params: Joi.object().keys({
    id: Joi.string().required().length(24).hex(),
  }),
}), createProfile);

router.patch('/users/me', cookieParser(), celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().min(2).max(30).required(),
  }),
}), updateProfile);

router.patch('/users/me/avatar', cookieParser(), celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().pattern(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)/),
  }),
}), updateAvatar);

module.exports = router;
