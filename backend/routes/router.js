const router = require('express').Router();
const usersRouter = require('./users');
const cardsRouter = require('./cards');
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/NotFoundError');

router.use('/users', usersRouter);
router.use('/cards', cardsRouter);
router.use(auth);
router.use(() => {
  throw new NotFoundError({ message: 'Карточки с такими данными не существует' });
});

module.exports = router;
