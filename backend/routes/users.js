const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getUsers, getProfile, createProfile, updateProfile, updateAvatar,
} = require('../controllers/users');

router.get('/users', getUsers);
router.get('/users/me', getProfile);

router.get('/users/:userId', celebrate({
  body: Joi.object().keys({
    userId: Joi.string().length(24).hex(),
  }),
}), updateProfile);

router.patch('/users/me', celebrate({
  body: Joi.object().keys({
    // eslint-disable-next-line
    avatar: Joi.string().pattern(/^https?:\/\/(www\.)?[\w\-\/\.a-z#?]{1,}/i).required(),
  }),
}), updateAvatar);

router.patch('/users/me/avatar', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), createProfile);

module.exports = router;
