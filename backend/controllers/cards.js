const Card = require('../models/card');
const ValidationError = require('../errors/ValidationError');
const ProfileError = require('../errors/ProfileError');
const NotFoundError = require('../errors/NotFoundError');

const getCards = (req, res, next) => Card.find({})
  .then((cards) => res.status(200).send(cards))
  .catch(next);

const createCard = (req, res, next) => {
  const { _id } = req.user;
  const { name, link } = req.body;

  Card.create({ name, link, owner: _id })
    .then((card) => {
      Card.findById(card._id)
        .then((data) => res.status(200).send(data))
        .catch(() => {
          throw new NotFoundError('Нет карточки с такими данными');
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
  const { id } = req.params;

  Card.findByIdAndRemove(id)
    .orFail(new NotFoundError('Нет карточки с такими данными'))
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.name === 'CastError' || err.message === 'Not found') {
        throw new ProfileError('У вас нет прав на данное дейтвие');
      }
    })
    .catch(next);
};

const likeCard = (req, res, next) => {
  const { _id } = req.user;
  const { id } = req.params;

  Card.findByIdAndUpdate(id, { $addToSet: { likes: _id } }, {
    new: true,
    runValidators: true,
    upsert: true,
  })
    .orFail(() => { throw new NotFoundError('Нет карточки с такими данными'); })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'CastError' || err.message === 'Not found') {
        throw new NotFoundError('Нет карточки с такими данными');
      }
    })
    .catch(next);
};

const dislikeCard = (req, res, next) => {
  const { _id } = req.user;
  const { id } = req.params;
  Card.findByIdAndUpdate(id, { $pull: { likes: _id } }, {
    new: true,
    runValidators: true,
    upsert: true,
  })
    .orFail(() => { throw new NotFoundError('Нет карточки с такими данными'); })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'CastError' || err.message === 'Not found') {
        throw new NotFoundError('Нет карточки с такими данными');
      }
    })
    .catch(next);
};

module.exports = {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
};
