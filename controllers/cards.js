/* eslint-disable no-unused-vars */
const Card = require('../models/card');
const { ERROR_BAD_REQUEST, ERROR_NOT_FOUND, ERROR_SERVER } = require('../utils/constants');

function getCards(req, res) {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch((err) => {
      res.status(ERROR_SERVER).send({ message: 'На сервере произошла ошибка' });
    });
}

function createCard(req, res) {
  const { name, link } = req.body;
  // const owner = req.user._id;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ERROR_BAD_REQUEST).send({ message: 'Переданы некорректные данные при создании карточки.' });
        return;
      }
      res.status(ERROR_SERVER).send({ message: 'На сервере произошла ошибка' });
    });
}

function deleteCard(req, res) {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (!card) {
        res.status(ERROR_NOT_FOUND).send({ message: 'Такой карточки не существует.' });
        return;
      }
      res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(ERROR_BAD_REQUEST).send({ message: 'Передан несуществующий _id карточки.' });
        return;
      }
      res.status(ERROR_SERVER).send({ message: 'На сервере произошла ошибка' });
    });
}

function setLike(req, res) {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        res.status(ERROR_NOT_FOUND).send({ message: 'Такой карточки не существует.' });
        return;
      }
      res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(ERROR_BAD_REQUEST).send({ message: 'Передан несуществующий _id карточки.' });
        return;
      }
      res.status(ERROR_SERVER).send({ message: 'На сервере произошла ошибка' });
    });
}

function removeLike(req, res) {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        res.status(ERROR_NOT_FOUND).send({ message: 'Такой карточки не существует.' });
        return;
      }
      res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(ERROR_BAD_REQUEST).send({ message: 'Передан несуществующий _id карточки.' });
        return;
      }
      res.status(ERROR_SERVER).send({ message: 'На сервере произошла ошибка' });
    });
}

module.exports = {
  getCards,
  createCard,
  deleteCard,
  setLike,
  removeLike,
};
