const Card = require('../models/card');
const ValidationError = require('../errors/ValidationError');
const ProfileError = require('../errors/ProfileError');
const NotFoundError = require('../errors/NotFoundError');

const getCards = (req, res, next) => Card.find({})
  .populate(['likes', 'owner'])
  .then((cards) => res.status(200).send(cards))
  .catch(next);

const createCard = (req, res, next) => {
  Card.create({ ...req.body, owner: req.user._id })
    .then((cards) => res.status(200).send(cards))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new ValidationError('Данные для создания карточки не найдены');
      } else {
        next(err);
      }
    });
};

const deleteCard = (req, res, next) => Card.findByIdAndDelete(req.params._id)
  .orFail(new NotFoundError('Карточка не найдена'))
  .populate(['likes', 'owner'])
  .then((card) => {
    if (card.owner.toString() !== req.user._id) {
      return next(new ProfileError('Невозможно удалить чужую карточку'));
    }
    res.status(200).send({ message: 'Карточка удалена!' });
  })
  .catch(next);

const likeCard = (req, res, next) => Card.findByIdAndUpdate(
  req.params._id,
  { $addToSet: { likes: req.user._id } },
  { new: true },
)
  .orFail(new NotFoundError('Карточка не найдена'))
  .then((card) => res.status(200).send(card))
  .catch(next);

const dislikeCard = (req, res, next) => Card.findByIdAndUpdate(
  req.params._id,
  { $pull: { likes: req.user._id } },
  { new: true },
)
  .orFail(new NotFoundError('Карточка не найдена'))
  .then((card) => res.status(200).send(card))
  .catch(next);

module.exports = {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
};
