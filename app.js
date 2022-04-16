// const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const user = require('./routes/user');
const card = require('./routes/card');
// const { status } = require('express/lib/response');

const { PORT = 3000 } = process.env; // Слушаем 3000 порт
const app = express();

// подключаемся к серверу mongo
// mongoose.connect('mongodb://localhost:27017/mestodb');

// миделвеа
app.use((req, res, next) => {
  next();
});
app.use((req, res, next) => {
  req.user = { // это _id созданного пользователя 'Тестовый пользователь'
    _id: '62586a743a024449d70a1ecd',
  };
  next();
});

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

// подключаем роуты и всё остальное...
app.use(express.json());
// app.use(routes);
app.use(user);
app.use(card);

// роутинг
app.get('/', (req, res) => {
  res
    .send('Hello word!!!!');
});
app.post('/', (req, res) => {
  res
    .send(req.body);
});

// обработка ошибок
// Обработаем некорректный маршрут и вернём ошибку 404
app.use('*', (req, res) => {
  res
    .status(404)
    .send({ message: `Страницы по адресу ${req.baseUrl} не существует` });
});

// запуск сервера
main();
