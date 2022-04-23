/* GET /users/:userId - возвращает пользователя по _id
   GET /users — возвращает всех пользователей
   POST /users — создаёт пользователя
   PATCH /users/me — обновляет профиль
   PATCH /users/me/avatar — обновляет аватар профиля
*/

const bcrypt = require('bcryptjs'); // импортируем bcrypt
const jwt = require('jsonwebtoken'); // импортируем jwt

const User = require('../models/user');
const {
  SEKRET_KEY,
  ERROR_CODE_BAD_REQUEST,
  ERROR_CODE_NOT_FOUND,
  ERROR_CODE_INTERNAL,
  ERROR_CODE_BAD_AUTH,
} = require('../constants');

//  login (/POST)  авторизация(залогиниывание) пользователя по email и password
module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, SEKRET_KEY, { expiresIn: '7d' });
      res.send({ token });
    })
    .catch(() => {
      next(new ERROR_CODE_BAD_AUTH('Неправильные почта или пароль.'));
    });
};

// GET /users/:userId - возвращает пользователя по _id
module.exports.getUserById = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (user) {
        res.status(200).send({ data: user });
      } else {
        res.status(ERROR_CODE_NOT_FOUND).send({ message: 'Ошибка. Пользователь не найден, попробуйте еще раз' });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(ERROR_CODE_BAD_REQUEST).send({ message: 'Ошибка. Введен некорректный id пользователя' });
      } else {
        res.status(ERROR_CODE_INTERNAL).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

// GET /users — возвращает всех пользователей
module.exports.getUsers = (req, res) => {
  User.find({})
    .then((user) => {
      res.status(200).send({ data: user });
    })
    .catch(() => {
      res.status(ERROR_CODE_INTERNAL).send({ message: 'На сервере произошла ошибка' });
    });
};

// POST /users — создаёт пользователя
module.exports.postUsers = (req, res) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  if (!email || !password) {
    return res.status(ERROR_CODE_BAD_REQUEST).send({ message: 'Поля email и password обязательны' });
  }

  // хешируем пароль
  return bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({
      name, about, avatar, email: req.body.email, password: hash,
    }))
    .then((user) => res.send({ user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ERROR_CODE_BAD_REQUEST).send({ message: 'Переданы некорректные данные при создании пользователя' });
      } else if (err.code === 11000) {
        res.status(ERROR_CODE_BAD_REQUEST).send({ message: 'Передан уже зарегистрированный email.' });
      } else {
        res.status(ERROR_CODE_INTERNAL).send({ message: ` ${err.message} На сервере произошла ошибка` });
      }
    });
};

// PATCH /users/me — обновляет профиль
module.exports.updateUserProfile = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        res.status(ERROR_CODE_NOT_FOUND).send({ message: 'Пользователь по указанному id не найден' });
      }
      return res.status(200).send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ERROR_CODE_BAD_REQUEST).send({ message: 'Переданы некорректные данные при редактировании пользователя' });
      } else if (err.name === 'CastError') {
        res.status(ERROR_CODE_BAD_REQUEST).send({ message: 'Пользователь по указанному _id не найден.' });
      }
      res.status(ERROR_CODE_INTERNAL).send({ message: 'На сервере произошла ошибка' });
    });
};

// PATCH /users/me/avatar — обновляет аватар профиля
module.exports.patchMeAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        res.status(ERROR_CODE_NOT_FOUND).send({ message: 'Пользователь по указанному id не найден' });
      }
      return res.status(200).send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ERROR_CODE_BAD_REQUEST).send({ message: 'Переданы некорректные данные при редактировании пользователя' });
      } else if (err.name === 'CastError') {
        res.status(ERROR_CODE_BAD_REQUEST).send({ message: 'Пользователь по указанному _id не найден.' });
      }
      res.status(ERROR_CODE_INTERNAL).send({ message: 'На сервере произошла ошибка' });
    });
};
