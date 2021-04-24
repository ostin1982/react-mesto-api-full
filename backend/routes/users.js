const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getUsers, createProfile, getProfile, updateProfile, updateAvatar,
} = require('../controllers/users');

router.get('/', getUsers);

router.get('/me', getProfile);

router.get('/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().required().length(24).hex(),
  }),
}), createProfile);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().min(2).max(30).required(),
  }),
}), updateProfile);

router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().pattern(new RegExp(/^https?:\/\/[\w\-.~:/?#[\]@!$&'()*+,;=%]{4,2048}$/)),
  }),
}), updateAvatar);

module.exports = router;
