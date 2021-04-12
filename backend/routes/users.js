const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getUsers, getProfile, createProfile, updateProfile, updateAvatar, login, createUser,
} = require('../controllers/users');
const auth = require('../middlewares/auth');

router.get('/', getUsers);
router.get('/me', getProfile);
router.get('/:usersId', celebrate({
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

router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    // eslint-disable-next-line
    avatar: Joi.string().pattern(/^https?:\/\/(www\.)?[\w\-\/\.a-z#?]{1,}/i).required(),
  }),
}), updateAvatar);

module.exports = router;
