const router = require('express').Router();
const usersRouter = require('./users');
const cardsRouter = require('./cards');
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/NotFoundError');

router.use('/users', usersRouter);
router.use('/cards', cardsRouter);
router.use(auth);
router.use('*', (req, res, next) => {
  next(new NotFoundError({ message: 'Запрашиваемый ресурс не найден' }));
});

module.exports = router;
