const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

const AuthenticationError = require('../errors/AuthenticationError');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: 'Жак-Ив Кусто',
    minlength: [2, '2 символа минимальное число символов'],
    maxlength: [30, '30 сиволов максимальное число символов'],
  },

  about: {
    type: String,
    default: 'Исследователь океана',
    minlength: [2, '2 символа минимальное число символов'],
    maxlength: [30, '30 сиволов максимальное число символов'],
  },

  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator: (link) => validator.isURL(link),
      message: (props) => `${props.value} некорректный адрес!`,
    },
  },

  email: {
    type: String,
    required: [true, 'Поле обязательно для заполнения'],
    unique: true,
    validate: {
      validator: (email) => validator.isEmail(email),
      message: (props) => `${props.value} некорректный адрес!`,
    },
  },

  password: {
    type: String,
    required: [true, 'Поле обязательно для заполнения'],
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function findUserByCredentials(email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new AuthenticationError('Некорректные почта или пароль'));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new AuthenticationError('Некорректные почта или пароль'));
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
