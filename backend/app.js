const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const expressWinston = require('express-winston');
const winston = require('winston');
const { celebrate, CelebrateError, Joi } = require('celebrate');

const router = require('./routes');
const { login, createUser } = require('./controllers/users');
const NotFoundError = require('./errors/NotFoundError');
const auth = require('./middlewares/auth');

const app = express();

const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const allowedCors = [
  'https://ostin.nomoredomains.icu',
  'https://www.ostin.nomoredomains.icu',
  'http://ostin.nomoredomains.icu',
  'http://www.ostin.nomoredomains.icu',
  'http://localhost:3001',
  'http://localhost:3000',
];

const corsOptions = {
  origin: allowedCors,
  optionsSuccessStatus: 200,
};

const requestLogger = expressWinston.logger({
  transports: [
    new winston.transports.File({ filename: 'request.log' }),
  ],
  format: winston.format.json(),
});

const errorLogger = expressWinston.errorLogger({
  transports: [
    new winston.transports.File({ filename: 'error.log' }),
  ],
  format: winston.format.json(),
});

const errorHandler = (err, req, res, next) => {
  if (err.status) {
    return res.status(err.status).send({ message: err.message });
  }

  if (err instanceof CelebrateError) {
    return res.status(400).send({ message: `Переданы неверные/ неполные данные: ${err}` });
  }

  res.status(500).send({ message: err.message });
  return next();
};

app.use(cors(corsOptions));

app.use((req, res, next) => {
  const { origin } = req.headers;
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }

  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signin', celebrate({
  body: {
    email: Joi.string().required().email(),
    password: Joi.string().required().min(2),
  },
}),
login);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(/https?:\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/),
    about: Joi.string().min(2).max(30),
  }),
}),
createUser);

app.use(auth);
app.use('/', router);

app.use(errorLogger);

app.use(() => {
  throw new NotFoundError('Запрашиваемый ресурс не найден');
});

app.use(errorHandler);

app.listen(PORT);
