const express = require('express');
const mongoose = require('mongoose');
const expressWinston = require('express-winston');
const winston = require('winston');
const { celebrate, errors, Joi } = require('celebrate');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const router = require('./routes/router');
const { login, createUser } = require('./controllers/users');

const { PORT = 3000 } = process.env;

const app = express();

const allowedCors = [
  'https://ostin.student.nomoredomains.club',
  'http://ostin.student.nomoredomains.club',
  'http://localhost:3001',
  'http://localhost:3000',
];

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const corsOptions = {
  origin: allowedCors,
  optionsSuccessStatus: 200,
};

app.use((req, res, next) => {
  const { origin } = req.headers;

  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }

  next();
});

app.use(cors(corsOptions));
app.use(bodyParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());

app.use(expressWinston.logger({
  transports: [
    new winston.transports.File({ filename: 'request.log' }),
  ],
  format: winston.format.json(),
}));

app.use(expressWinston.errorLogger({
  transports: [
    new winston.transports.File({ filename: 'error.log' }),
  ],
  format: winston.format.json(),
}));

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}),
createUser);

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}),
login);

app.use('/', router);

app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500 ? `На сервере произошла ошибка${err}` : message,
  });
  next();
});

app.listen(PORT, () => {

});
