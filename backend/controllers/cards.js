const Card = require('../models/card');
const ValidationError = require('../errors/ValidationError');
const ProfileError = require('../errors/ProfileError');
const NotFoundError = require('../errors/NotFoundError');

const getCards = (req, res, next) => Card.find({})
  .then((cards) => res.status(200).send(cards))
  .catch(next);

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const { _id: owner } = req.user;

  Card.create({ name, link, owner })
    .then((card) => {
      Card.findById(card)
        .then((data) => res.status(200).send(data))
        .catch(() => {
          throw new NotFoundError('Карточки с такими данными не существует!');
        });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new ValidationError('Ошибка в заполнении полей');
      }
    })
    .catch(next);
};

const deleteCard = (req, res, next) => {
  const { cardId } = req.params;

  Card.findByIdAndRemove(cardId)
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
  const { cardId } = req.params;
  const { _id } = req.user;

  Card.findByIdAndUpdate(cardId, { $addToSet: { likes: _id } }, {
    new: true,
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
  const { cardId } = req.params;
  const { _id } = req.user;

  Card.findByIdAndUpdate(cardId, { $pull: { likes: _id } }, {
    new: true,
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
