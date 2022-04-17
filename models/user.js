const mongoose = require('mongoose');

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
  },
});

// создаём модель и экспортируем её
module.exports = mongoose.model('user', userSchema);
