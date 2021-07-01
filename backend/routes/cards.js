const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const cookieParser = require('cookie-parser');
const {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');

router.get('/cards', cookieParser(), getCards);

router.post('/cards', cookieParser(), celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(new RegExp(/^https?:\/\/[\w\-.~:/?#[\]@!$&'()*+,;=%]{4,2048}$/)),
  }),
}), createCard);

router.delete('/cards/:cardId', cookieParser(), celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).required().hex(),
  }),
}), deleteCard);

router.put('/cards/:cardId/likes', cookieParser(), celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).required().hex(),
  }),
}), likeCard);

router.delete('/cards/:cardId/likes', cookieParser(), celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).required().hex(),
  }),
}), dislikeCard);

module.exports = router;
