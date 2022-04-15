const mongoose = require('mongoose');
// const assert = require('assert');

const RegExp = /^((ftp|http|https):\/\/)?(www\.)?([A-Za-zА-Яа-я0-9]{1}[A-Za-zА-Яа-я0-9-]*\.?)*\.{1}[A-Za-zА-Яа-я0-9-]{2,8}(\/([\w#!:.?+=&%@!\-/])*)?/;

// Опишем схему:
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: [2, 'Мин длина 2 символа'],
    maxlength: [30, 'Мах длина 30 символа'],
  },
  about: {
    type: String,
    required: true,
    minlength: [2, 'Мин длина 2 символа'],
    maxlength: [30, 'Мах длина 30 символа'],
  },
  avatar: {
    type: String,
    required: true,
    src: RegExp,
  },
});

// let user = db.model('user', userSchema);

// let errorUser = userSchema.validateSync();
// assert.equal(errorUser.errors.name.message, 'fild `name` is required.');

// userSchema.about = null;
// errorAbout = userSchema.validateSync();
// assert.equal(errorAbout.errors.about.message, 'Why no about?');

// создаём модель и экспортируем её
module.exports = mongoose.model('user', userSchema);
