const Card = require('../models/card');
const ValidationError = require('../errors/ValidationError');
const ProfileError = require('../errors/ProfileError');
const NotFoundError = require('../errors/NotFoundError');

const getCards = (req, res, next) => Card.find({})
  .populate(['likes', 'owner'])
  .then((cards) => res.send(cards))
  .catch(next);

const createCard = (req, res, next) => {
  const { _id } = req.user;
  const { name, link } = req.body;
  Card.create({ name, link, owner: _id })
    .then((card) => {
      Card.findById(card._id)
        .populate('owner')
        .then((data) => res.status(200).send(data))
        .catch(() => {
          throw new NotFoundError('Карточки с данным id не существует');
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
  Card.findByIdAndDelete(id)
    .orFail(new NotFoundError(`Not found: ${id}`))
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
    .populate(['owner', 'likes'])
    .orFail(() => { throw new NotFoundError('Документ не найден'); })
    .then((like) => res.send(like))
    .catch((err) => {
      if (err.name === 'CastError' || err.message === 'Not found') {
        throw new NotFoundError(`Нет пользователя с таким: ${id}`);
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
    .populate(['owner', 'likes'])
    .orFail(() => { throw new NotFoundError('Документ не найден'); })
    .then((dislike) => res.status(200).send(dislike))
    .catch((err) => {
      if (err.name === 'CastError' || err.message === 'Not found') {
        throw new NotFoundError(`Нет пользователя с таким: ${id}`);
      }
    })
    .catch(next);
};

module.exports = {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
};
