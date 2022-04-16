const mongoose = require('mongoose');

const RegExp = /^((ftp|http|https):\/\/)?(www\.)?([A-Za-zА-Яа-я0-9]{1}[A-Za-zА-Яа-я0-9-]*\.?)*\.{1}[A-Za-zА-Яа-я0-9-]{2,8}(\/([\w#!:.?+=&%@!\-/])*)?/;

// Опишем схему:
const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: [2, 'Мин длина 2 символа'],
    maxlength: [30, 'Мах длина 30 символа'],
  },
  link: {
    type: String,
    required: true,
    src: RegExp,
  },
  owner: {
    type: 'ObjectId',
    required: true,
  },
  likes: {
    type: 'array',
    default: {},
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },

});

// создаём модель и экспортируем её
module.exports = mongoose.model('card', cardSchema);
