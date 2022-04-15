const user = require('../models/user');

module.exports.getUser = (req, res) => {
  user.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => res.status(500).send({ message: err.message }));
};

module.exports.getUsers = (req, res) => {
  user.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => res.status(500).send({ message: err.message }));
};

module.exports.postUsers = (req, res) => {
  const { name, about, avatar } = req.body;

  user.create({ name, about, avatar })
    .then((users) => res.send({ data: users }))
    .catch((err) => res.status(500).send({ message: err.message }));
};
