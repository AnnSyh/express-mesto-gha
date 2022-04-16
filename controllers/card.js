/* GET /cards — возвращает все карточки
   POST /cards — создаёт карточку
   DELETE /cards/:cardId — удаляет карточку по идентификатору
   PUT /cards/:cardId/likes — поставить лайк карточке
   DELETE /cards/:cardId/likes — убрать лайк с карточки
*/

const Сard = require('../models/card');
const Error400 = require('../errors/Error400');
const Error404 = require('../errors/Error404');
const Error500 = require('../errors/Error500');

// GET /cards — возвращает все карточки
module.exports.getCards = (req, res, next) => {
  Сard.find({})
    .then((cards) => {
      res.status(200).send({ data: cards });
    })
    .catch(() => {
      next(new Error500('На сервере произошла ошибка'));
    });
};

// POST /cards — создаёт карточку
module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Сard.create({ name, link, owner })
    .then((card) => res.status(200).send({
      name: card.name,
      link: card.link,
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new Error400('Переданы некорректные данные при создании карточки'));
      } else {
        next(new Error500('На сервере произошла ошибка'));
      }
    });
};

// DELETE /cards/:cardId — удаляет карточку по идентификатору
module.exports.deleteCard = (req, res, next) => {
  Сard.findByIdAndRemove(req.params.cardId)
    .then((cards) => res.send({ data: cards }))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new Error404('Ошибка. Карта не найдена'));
      }
      return next(new Error500('На сервере произошла ошибка'));
    });
};

// PUT /cards/:cardId/likes — поставить лайк карточке
module.exports.likeCard = (req, res, next) => {
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
        next(new Error400('Ошибка. В формате ID карточки'));
      } else {
        next(new Error500('На сервере произошла ошибка'));
      }
    });
};

// DELETE /cards/:cardId/likes — убрать лайк с карточки
module.exports.dislikeCard = (req, res, next) => {
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
        next(new Error400('Ошибка. В формате ID карточки'));
      } else {
        next(new Error500('На сервере произошла ошибка'));
      }
    });
};
