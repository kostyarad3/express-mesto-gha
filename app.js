/* eslint-disable no-console */
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
// для второго варианта
// const cookieParser = require('cookie-parser');
const routes = require('./routes/index');
const setError = require('./middlewares/setError');
const NotFoundError = require('./errors/not-found-err');
const { auth } = require('./middlewares/auth');
const userRoutes = require('./routes/users');
const cardRoutes = require('./routes/cards');

const { PORT = 3000 } = process.env;
const BASE_URL = 'mongodb://127.0.0.1:27017/mestodb';

mongoose
  .connect(BASE_URL)
  .then(() => {
    console.log(`Successfully connected on ${BASE_URL}`);
  })
  .catch((err) => {
    console.log(`Connection to database failed: ${err}`);
  });

const app = express();
app.use(express.json());
// для второго варианта
// app.use(cookieParser);

app.use(routes);
app.use(auth);
app.use('/users', userRoutes);
app.use('/cards', cardRoutes);

app.use((req, res, next) => next(new NotFoundError('Страница не найдена')));
app.use(errors());
app.use(setError);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
