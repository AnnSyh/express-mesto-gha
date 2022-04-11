const express = require('express');
// const mongoose = require('mongoose');
const { PORT = 3000 } = process.env; // Слушаем 3000 порт
const app = express();
// подключаемся к серверу mongo
// mongoose.connect('mongodb://localhost:27017/mydb', {
//   useNewUrlParser: true,
//   useCreateIndex: true,
//   useFindAndModify: false,
// });
app.get('/', (req, res) => {
  res.send('Hello word');
});
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`); // Если всё работает, консоль покажет, какой порт приложение слушает
});
