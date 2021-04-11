const Card = require('../models/card');
const ValidationError = require('../errors/ValidationError');
const ProfileError = require('../errors/ProfileError');
const NotFoundError = require('../errors/NotFoundError');

const getCards = (req, res, next) => Card.find({})
  .then((cards) => res.status(200).send(cards))
  .catch(next);

const createCard = (req, res, next) => {
  Card.create({ ...req.body, owner: req.user._id })
    .then((card) => {
      Card.findById(card._id)
        .then((data) => res.send(data))
        .catch(() => {
          throw new NotFoundError('{#label} Карточки с данным id не существует');
        });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new ValidationError('{#label} Ошибка в заполнении полей');
      }
    })
    .catch(next);
};

const deleteCard = (req, res, next) => Card.findByIdAndDelete(req.params._id)
  .orFail(new NotFoundError(`{#label} Not found: ${req.params._id}`))
  .then((card) => res.status(200).send(card))
  .catch((err) => {
    if (err.name === 'CastError' || err.message === 'Not found') {
      throw new ProfileError('{#label} У вас нет прав на данное дейтвие');
    }
  })
  .catch(next);

const likeCard = (req, res, next) => Card.findByIdAndUpdate(
  req.params._id,
  { $addToSet: { likes: req.user._id } },
  { new: true },
)
  .orFail(() => { throw new NotFoundError('{#label} Документ не найден'); })
  .then((card) => res.send(card))
  .catch((err) => {
    if (err.name === 'CastError' || err.message === 'Not found') {
      throw new NotFoundError('{#label} Карточки с данным id не существует');
    }
  })
  .catch(next);

const dislikeCard = (req, res, next) => Card.findByIdAndUpdate(
  req.params._id,
  { $pull: { likes: req.user._id } },
  { new: true },
)
  .orFail(() => { throw new NotFoundError('{#label} Карточки с данным id не существует'); })
  .then((card) => res.status(200).send(card))
  .catch((err) => {
    if (err.name === 'CastError' || err.message === 'Not found') {
      throw new NotFoundError('{#label} Карточки с данным id не существует');
    }
  })
  .catch(next);

module.exports = {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
};
