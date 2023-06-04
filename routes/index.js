const router = require('express').Router();
const userRoutes = require('./users');
const cardRoutes = require('./cards');
const { ERROR_NOT_FOUND } = require('../utils/constants');

router.use('/users', userRoutes);
router.use('/cards', cardRoutes);

router.use('*', (req, res) => { res.status(ERROR_NOT_FOUND).send({ message: 'Страница не найдена' }); });

module.exports = router;
