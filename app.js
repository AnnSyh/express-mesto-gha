// const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const user = require('./routes/user');
const card = require('./routes/card');
// const { status } = require('express/lib/response');

const { PORT = 3000 } = process.env; // Слушаем 3000 порт
const app = express();

// функция обработки ошибок при подключении к серверу mongo
async function main() {
  try {
    await mongoose.connect('mongodb://localhost:27017/mestodb');
  } catch (error) {
    console.log(error);
  }

  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`); // Если всё работает, консоль покажет, какой порт приложение слушает
  });
}

// подключаемся к серверу mongo
// mongoose.connect('mongodb://localhost:27017/mestodb');

// миддлвара
app.use((req, res, next) => {
  req.user = { // это _id созданного пользователя 'Тестовый пользователь'
    _id: '62586a743a024449d70a1ecd',
  };
  next();
});

// подключаем роуты и всё остальное...
app.use(express.json());
// app.use(routes);
app.use(user);
app.use(card);

// обработка ошибок
// Обработаем некорректный маршрут и вернём ошибку ERROR_CODE_NOT_FOUND
app.use('*', (req, res) => {
  res
    .status(ERROR_CODE_NOT_FOUND)
    .send({ message: `Страницы по адресу ${req.baseUrl} не существует` });
});

// запуск сервера
main();
