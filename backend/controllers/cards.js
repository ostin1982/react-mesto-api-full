const Card = require('../models/card');
const ValidationError = require('../errors/ValidationError');
const NotFoundError = require('../errors/NotFoundError');
const ProfileError = require('../errors/ProfileError');

const getCards = (req, res, next) => Card.find({})
  .then((cards) => res.send(cards))
  .catch(next);

const createCard = (req, res, next) => {
  const { _id } = req.user;
  const { name, link } = req.body;

  Card.create({ name, link, owner: _id })
    .then((card) => {
      Card.findById(card._id)
        .then((data) => res.status(200).send(data))
        .catch(() => {
          throw new NotFoundError('Карточки с такими данными не существует');
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
  Card.findById(req.params._id)
    .then((card) => {
      if (!card) throw new NotFoundError('Карточки с такими данными не существует!');
      if (!card.owner.equals(req.user._id)) {
        throw new ProfileError('Ошибка доступа');
      }
      card.remove();
      res.send(card);
    })
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        next(new NotFoundError('Карточки с такими данными не существует!'));
      }
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        next(new ValidationError('Данные не коректны'));
      }
      next(err);
    });
};

const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params._id,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail()
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        next(new NotFoundError('Карточки с такими данными не существует!'));
      }
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        next(new ValidationError('Данные не коректны'));
      }
      next(err);
    });
};

const dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params._id,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail()
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        next(new NotFoundError('Карточки с такими данными не существует!'));
      }
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        next(new ValidationError('Данные не коректны'));
      }
      next(err);
    });
};

module.exports = {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
};
