/* GET /users/:userId - возвращает пользователя по _id
   GET /users — возвращает всех пользователей
   POST /users — создаёт пользователя
   PATCH /users/me — обновляет профиль
   PATCH /users/me/avatar — обновляет аватар профиля
*/

const User = require('../models/user');
const Error400 = require('../errors/Error400');
const Error404 = require('../errors/Error404');
const Error500 = require('../errors/Error500');

// GET /users/:userId - возвращает пользователя по _id
module.exports.getUserById = (req, res, next) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (user) {
        res.status(200).send({ data: user });
      } else {
        next(new Error400('Ошибка. Пользователь не найден, попробуйте еще раз'));
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new Error400('Ошибка. Введен некорректный id пользователя'));
      } else {
        next(new Error500('На сервере произошла ошибка'));
      }
    });
};

// GET /users — возвращает всех пользователей
module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((user) => {
      res.status(200).send({ data: user });
    })
    .catch(() => {
      next(new Error500('На сервере произошла ошибка'));
    });
};

// POST /users — создаёт пользователя
module.exports.postUsers = (req, res, next) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => {
      res.status(200).send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new Error400('Переданы некорректные данные при создании пользователя'));
      } else {
        next(new Error500('На сервере произошла ошибка'));
      }
    });
};

// PATCH /users/me — обновляет профиль
module.exports.updateUserProfile = (req, res, next) => {
  const { name, about } = req.body;
  const userID = req.user._id;

  User.findByIdAndUpdate(userID, { name, about }, { new: true })
    .then((user) => {
      if (!user) {
        next(new Error404('Пользователь с указанным _id не найден'));
      }
      return res.status(200).send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new Error400('Переданы некорректные данные при редактировании пользователя'));
      }
      next(new Error500('На сервере произошла ошибка'));
    });
};

// PATCH /users/me/avatar — обновляет аватар профиля
module.exports.patchMeAvatar = (req, res, next) => {
  const { name, avatar } = req.body;
  const userID = req.user._id;

  User.findByIdAndUpdate(userID, { name, avatar }, { new: true })
    .then((user) => {
      if (!user) {
        next(new Error404('Пользователь с указанным _id не найден'));
      }
      return res.status(200).send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new Error400('Переданы некорректные данные при редактировании пользователя'));
      }
      next(new Error500('На сервере произошла ошибка'));
    });
};
