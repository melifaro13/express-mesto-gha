const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const routes = require('./routes/index');
const { login, createUser } = require('./controllers/users');
const { validationLogin, validationCreateUser } = require('./middlewares/validations');
const auth = require('./middlewares/auth');
const extractJwt = require('./middlewares/extractJwt');
const handleError = require('./middlewares/handleError');
const NotFoundDocumentError = require('./errors/NotFoundDocumentError');

const app = express();
const { PORT = 3000 } = process.env;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(extractJwt);

app.post('/signin', validationLogin, login);
app.post('/signup', validationCreateUser, createUser);

app.use(auth);
app.use(routes);

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  family: 4,
}).then(() => {
  console.log('Подключение к БД');
}).catch(() => {
  console.log('Не удалось подключиться к БД');
});

app.use('*', NotFoundDocumentError);

app.use(errors());
app.use(handleError);

app.listen(PORT, () => {
  console.log(`Сервер запущен на ${PORT} порту`);
});
