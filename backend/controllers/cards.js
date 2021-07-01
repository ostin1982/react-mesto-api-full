const Card = require('../models/card');
const ProfileError = require('../errors/ProfileError');
const NotFoundError = require('../errors/NotFoundError');

const getCards = (req, res, next) => Card.find({})
  .then((cards) => res.send(cards))
  .catch(next);

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const { _id: owner } = req.user;

  Card.create({ name, link, owner })
    .then((card) => res.send(card))
    .catch(next);
};

const deleteCard = (req, res, next) => {
  Card.findByIdAndRemove(req.params.cardId)
    .orFail(new NotFoundError('Карточки с такими данными не существует!'))
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.name === 'CastError' || err.message === 'Not found') {
        throw new ProfileError('У вас нет прав на данное дейтвие');
      }
    })
    .catch(next);
};

const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, {
    new: true,
    runValidators: true,
    upsert: true,
  })
    .orFail(() => { throw new NotFoundError('Карточки с такими данными не существует'); })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'CastError' || err.message === 'Not found') {
        throw new NotFoundError('Карточки с такими данными не существует');
      }
    })
    .catch(next);
};

const dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, {
    new: true,
    runValidators: true,
    upsert: true,
  })
    .orFail(() => { throw new NotFoundError('Карточки с такими данными не существует!'); })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'CastError' || err.message === 'Not found') {
        throw new NotFoundError('Карточки с такими данными не существует!');
      }
    })
    .catch(next);
};

module.exports = {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
};
