const router = require('express').Router();
const bodyParser = require('body-parser');
const usersRouter = require('./users');
const cardsRouter = require('./cards');

const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/NotFoundError');

router.use('/users', bodyParser(), usersRouter);
router.use('/cards', bodyParser(), cardsRouter);
router.use(auth);
router.use('*', (req, res, next) => {
  next(new NotFoundError({ message: 'Карточки с такими данными не существует' }));
});

module.exports = router;
