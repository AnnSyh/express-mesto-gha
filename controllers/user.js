/* GET /users/:userId - возвращает пользователя по _id
   GET /users — возвращает всех пользователей
   POST /users — создаёт пользователя
   PATCH /users/me — обновляет профиль
   PATCH /users/me/avatar — обновляет аватар профиля
*/

const User = require('../models/user');

class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ValidationError';
    this.statusCode = 400;
  }
}

// GET /users/:userId - возвращает пользователя по _id
module.exports.getUserById = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      res.status(200).send({ data: user });
    })
    .catch(() => {
      res.status(500).send({ message: 'На сервере произошла ошибка' });
    });
};

// GET /users — возвращает всех пользователей
module.exports.getUsers = (req, res) => {
  User.find({})
    .then((user) => {
      res.status(200).send({ data: user });
    })
    .catch(() => {
      res.status(500).send({ message: 'На сервере произошла ошибка' });
    });
};

// POST /users — создаёт пользователя
module.exports.postUsers = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => {
      res.status(200).send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send(err.message);
      }
      return res.status(500).send({ message: '1111 На сервере произошла ошибка' });
    });
};

// PATCH /users/me — обновляет профиль
module.exports.updateUserProfile = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true })
    .then((user) => {
      if (!user) { return res.status(404).send({ message: 'Пользователь с указанным _id не найден' }); }
      return res.status(200).send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') { return res.status(400).send({ message: 'Переданы некорректные данные при редактировании пользователя.' }); }
      return res.status(500).send({ message: 'Произошла ошибка' });
    });
};

// PATCH /users/me/avatar — обновляет аватар профиля
module.exports.patchMeAvatar = (req, res) => {
  const { name, avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, avatar }, { new: true })
    .then((user) => {
      if (!user) { return res.status(404).send({ message: 'Пользователь с указанным _id не найден' }); }
      return res.status(200).send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') { return res.status(400).send({ message: 'Переданы некорректные данные при редактировании пользователя.' }); }
      return res.status(500).send({ message: 'Произошла ошибка' });
    });
};
