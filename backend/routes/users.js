const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getUsers, getProfile, createProfile, updateProfile, updateAvatar, login, createUser,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/:userId', getProfile);
router.get('/', celebrate({
  params: {
    userId: Joi.string().required().length(24).hex(),
  },
}),
createProfile);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().min(2).max(30).required(),
  }),
}), updateProfile);

router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    // eslint-disable-next-line
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
  }),
}), createUser);

module.exports = router;
