const Card = require('../models/card');
const ValidationError = require('../errors/ValidationError');
const ProfileError = require('../errors/ProfileError');
const NotFoundError = require('../errors/NotFoundError');

const getCards = (req, res, next) => Card.find({})
  .then((cards) => res.status(200).send(cards))
  .catch(next);

const createCard = (req, res, next) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => {
      Card.findById(card._id)
        .then((data) => res.send(data))
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
  const owner = req.user._id;
  Card.findOne({ _id: req.params.cardId })
    .orFail(new NotFoundError('Нет карточки с такими данными'))
    .then((card) => {
      if (!card.owner.equals(owner)) {
        throw new ProfileError('У вас нет прав на данное дейтвие');
      } else {
        Card.deleteOne(card)
          .then(() => res.status(200).send({ message: 'Карточка удалена' }));
      }
    })
    .catch((err) => {
      throw err;
    })
    .catch(next);
};

const likeCard = (req, res, next) => Card.findByIdAndUpdate(
  req.params._id,
  { $addToSet: { likes: req.user._id } },
  { new: true },
)
  .orFail(() => { throw new NotFoundError('Документ не найден'); })
  .then((card) => res.send(card))
  .catch((err) => {
    if (err.name === 'CastError' || err.message === 'Not found') {
      throw new NotFoundError('Карточки с данным id не существует');
    }
  })
  .catch(next);

const dislikeCard = (req, res, next) => Card.findByIdAndUpdate(
  req.params._id,
  { $pull: { likes: req.user._id } },
  { new: true },
)
  .orFail(() => { throw new NotFoundError('Карточки с данным id не существует'); })
  .then((card) => res.status(200).send(card))
  .catch((err) => {
    if (err.name === 'CastError' || err.message === 'Not found') {
      throw new NotFoundError('Карточки с данным id не существует');
    }
  })
  .catch(next);

module.exports = {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
};
