const User = require('../models/user');

// GET /users/:userId - возвращает пользователя по _id
module.exports.getUserById = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(500).send({ message: err.message }));
};

// GET /users — возвращает всех пользователей
module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => res.status(500).send({ message: err.message }));
};

// POST /users — создаёт пользователя
module.exports.postUsers = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((users) => res.send({ data: users }))
    .catch((err) => res.status(500).send({ message: err.message }));
};

// PATCH /users/me — обновляет профиль
module.exports.patchUser = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true })
    .then((user) => {
      if (!user) { return res.status(404).send({ message: 'Пользователь с указанным _id не найден' }); }
      return res.send({ data: user });
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
      return res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') { return res.status(400).send({ message: 'Переданы некорректные данные при редактировании пользователя.' }); }
      return res.status(500).send({ message: 'Произошла ошибка' });
    });
};
