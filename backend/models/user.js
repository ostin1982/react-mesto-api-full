const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: 'Жак-Ив Кусто',
    minlength: [2, '2 символа минимальное число символов'],
    maxlength: [30, '30 сиволов максимальное число символов'],
  },

  about: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
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
    minlength: 6,
  },
});

module.exports = mongoose.model('user', userSchema);
