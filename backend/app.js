require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const expressWinston = require('express-winston');
const winston = require('winston');
const { celebrate, Joi, CelebrateError } = require('celebrate');
const bodyParser = require('body-parser');
const cors = require('cors');
const auth = require('./middlewares/auth');
const cardsRouter = require('./routes/cards');
const usersRouter = require('./routes/users');
const { login, createUser } = require('./controllers/users');
const NotFoundError = require('./errors/NotFoundError');
const ValidationError = require('./errors/ValidationError');

const app = express();
const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(expressWinston.logger({
  transports: [
    new winston.transports.File({ filename: 'request.log' }),
  ],
  format: winston.format.json(),
}));

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().message('Требуется Email'),
    password: Joi.string().required().min(8).message('Минимум 8 символов'),
  }),
}),
login);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().message('Требуется Email'),
    password: Joi.string().required().min(8).message('Минимум 8 символов'),
  }),
}),
createUser);

app.use('/cards', auth, cardsRouter);
app.use('/users', auth, usersRouter);

app.use(expressWinston.logger({
  transports: [
    new winston.transports.File({ filename: 'error.log' }),
  ],
  format: winston.format.json(),
}));

app.use(() => {
  throw new NotFoundError('Карточки с такими данными не существует');
});

app.use((err, req, res, next) => {
  if (err instanceof CelebrateError) {
    next(new ValidationError('Данные не коректны'));
  }
  res.status(500).send({ message: err.message });
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? `На сервере произошла ошибка${err}`
        : message,
    });
});

app.listen(PORT, () => {});
