const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const expressWinston = require('express-winston');
const winston = require('winston');
const { celebrate, CelebrateError, Joi } = require('celebrate');

const router = require('./routes/router');
const { login, createUser } = require('./controllers/users');
const NotFoundError = require('./errors/NotFoundError');
const auth = require('./middlewares/auth');

const app = express();

const { PORT = 3001 } = process.env;

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const options = [
  'http://ostin.student.nomoredomains.club',
  'http://www.ostin.student.nomoredomains.club',
  'https://www.ostin.student.nomoredomains.club',
  'https://ostin.student.nomoredomains.club',
  'http://localhost:3000',
  'http://localhost:3001',
];

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
    return res.status(400).send({ message: `Переданы неверные данные: ${err}` });
  }
  res.status(500).send({ message: err.message });
  return next();
};

app.use(requestLogger);
app.use(helmet());
app.use(cors());
app.use(bodyParser.json());

app.use((req, res, next) => {
  const { origin } = req.headers;
  if (options.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }

  next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(requestLogger);

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

app.use(auth);
app.use('/', router);
app.use(errorLogger);

app.use(() => {
  throw new NotFoundError('Запрашиваемый ресурс не найден');
});

app.use(errorHandler);

app.listen(PORT);
