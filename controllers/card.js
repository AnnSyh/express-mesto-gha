const Сard = require('../models/card');

// GET /cards — возвращает все карточки
module.exports.getCards = (req, res) => {
  Сard.find({})
    .then((cards) => res.send({ data: cards }))
    .catch((err) => res.status(500).send({ message: err.message }));
};

// POST /cards — создаёт карточку
module.exports.createCard = (req, res) => {
  const { name, link } = req.body;

  Сard.create({ name, link, owner: req.user._id })
    .then((card) => res.send({
      name: card.name,
      link: card.link,
    }))
    .catch((err) => res.status(500).send({ message: err.message }));
};

// DELETE /cards/:cardId — удаляет карточку по идентификатору
module.exports.deleteCard = (req, res) => {
  Сard.findByIdAndRemove(req.params.cardId)
    .then((cards) => res.send({ data: cards }))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: 'карта не найдена' });
      }
      res.status(500).send({ message: err.message });
    });
};

// PUT /cards/:cardId/likes — поставить лайк карточке
module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .then((cards) => res.send({ data: cards }))
    .catch((err) => res.status(500).send({ message: err.message }));
};

// DELETE /cards/:cardId/likes — убрать лайк с карточки
module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .then((cards) => res.send({ data: cards }))
    .catch((err) => res.status(500).send({ message: err.message }));
};
