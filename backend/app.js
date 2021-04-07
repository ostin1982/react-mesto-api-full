const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const expressWinston = require('express-winston');
const winston = require('winston');
const { celebrate, errors, Joi } = require('celebrate');
const cors = require('cors');

const routerCards = require('./routes/cards');
const routerUsers = require('./routes/users');
const { login, createUser } = require('./controllers/users');
const NotFoundError = require('./errors/NotFoundError');

const { PORT = 3001 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

app.use(cors());

app.use(helmet());
app.use(bodyParser());

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
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}),
login);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}),
createUser);

app.use('/', routerCards);
app.use('/', routerUsers);

app.use(expressWinston.logger({
  transports: [
    new winston.transports.File({ filename: 'error.log' }),
  ],
  format: winston.format.json(),
}));

app.use(errors());

app.use('*', () => {
  throw new NotFoundError('Запрашиваемый ресурс не найден');
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

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Сервер запущен. Порт: ${PORT}`);
});
