const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getUsers, getProfile, createProfile, updateProfile, updateAvatar, login, createUser,
} = require('../controllers/users');
const auth = require('../middlewares/auth');

router.get('/users', auth, getUsers);
router.get('/users/:userId', auth, getProfile);
router.post('/users', auth, createProfile);

router.patch('/users/me', auth, celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().min(2).max(30).required(),
  }),
}), updateProfile);

router.patch('/users/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().pattern(/^https?:\/\/(www\.)?[\w\-\/\.a-z#?]{1,}/i).required(),
  }),
}), updateAvatar);

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), login);

router.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().min(2).max(30),
    avatar: Joi.string(),
    about: Joi.string().min(2).max(30),
  }),
}), createUser);

module.exports = router;