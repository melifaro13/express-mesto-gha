const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const routes = require('./routes/index');

const app = express();
const { PORT = 3000 } = process.env;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  family: 4,
}).then(() => {
    console.log('Подключение к БД')
}).catch(() => {
    console.log('Не удалось подключиться к БД');
});

app.use((req, res, next) => {
  req.user = {
    _id: '6485b9952c4cc605f0953c68'
  };
  next();
});

app.use(routes);

app.use('*', (req, res) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на ${PORT} порту`);
});