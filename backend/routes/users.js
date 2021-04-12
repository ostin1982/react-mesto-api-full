const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getUsers, getProfile, createProfile, updateProfile, updateAvatar, login, createUser,
} = require('../controllers/users');
const auth = require('../middlewares/auth');

router.get('/', auth, getUsers);
router.get('/:userId', auth, getProfile);
router.get('/', celebrate({
  params: {
    userId: Joi.string().required().length(24).hex(),
  },
}), createProfile);

router.patch('/me', auth, celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().min(2).max(30).required(),
  }),
}), updateProfile);

router.patch('/me/avatar', auth, celebrate({
  body: Joi.object().keys({
    // eslint-disable-next-line
    avatar: Joi.string().pattern(/^https?:\/\/(www\.)?[\w\-\/\.a-z#?]{1,}/i).required(),
  }),
}), updateAvatar);

router.post('/signin', auth, celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), login);

router.post('/signup', auth, celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), createUser);

module.exports = router;
