/* eslint-disable no-console */
const express = require('express');
const mongoose = require('mongoose');
// eslint-disable-next-line import/no-extraneous-dependencies
const { errors } = require('celebrate');
const routes = require('./routes/index');
const setError = require('./middlewares/setError');

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

app.use(routes);
app.use(setError);
app.use(errors());

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
