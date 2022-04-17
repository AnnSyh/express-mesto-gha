/* GET /cards — возвращает все карточки
   POST /cards — создаёт карточку
   DELETE /cards/:cardId — удаляет карточку по идентификатору
   PUT /cards/:cardId/likes — поставить лайк карточке
   DELETE /cards/:cardId/likes — убрать лайк с карточки
*/

const Сard = require('../models/card');
const {
  ERROR_CODE_BAD_REQUEST,
  ERROR_CODE_NOT_FOUND,
  ERROR_CODE_INTERNAL,
} = require('../constants');

// GET /cards — возвращает все карточки
module.exports.getCards = (req, res) => {
  Сard.find({})
    .then((cards) => {
      res.status(200).send({ data: cards });
    })
    .catch(() => {
      res.status(ERROR_CODE_INTERNAL).send({ message: 'На сервере произошла ошибка' });
    });
};

// POST /cards — создаёт карточку
module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Сard.create({ name, link, owner })
    .then((card) => res.status(200).send({
      name: card.name,
      link: card.link,
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ERROR_CODE_BAD_REQUEST).send({ message: 'Переданы некорректные данные при создании карточки' });
      } else {
        res.status(ERROR_CODE_INTERNAL).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

// DELETE /cards/:cardId — удаляет карточку по идентификатору
module.exports.deleteCard = (req, res) => {
  Сard.findByIdAndRemove(req.params.cardId)
    .then((cards) => res.send({ data: cards }))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(ERROR_CODE_BAD_REQUEST).send({ message: err.message });
      }
      return res.status(ERROR_CODE_INTERNAL).send({ message: 'На сервере произошла ошибка' });
    });
};

// PUT /cards/:cardId/likes — поставить лайк карточке
module.exports.likeCard = (req, res) => {
  Сard.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .then((cards) => {
      res.status(200).send({ data: cards });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(ERROR_CODE_BAD_REQUEST).send({ message: err.message });
      } else {
        res.status(ERROR_CODE_INTERNAL).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

// DELETE /cards/:cardId/likes — убрать лайк с карточки
module.exports.dislikeCard = (req, res) => {
  Сard.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .then((cards) => {
      res.status(200).send({ data: cards });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(ERROR_CODE_NOT_FOUND).send({ message: err.message });
      } else {
        res.status(ERROR_CODE_INTERNAL).send({ message: 'На сервере произошла ошибка' });
      }
    });
};
