const NotFoundError = require('../errors/NotFoundError');

module.exports = (req, res, next) => {
  const err = new NotFoundError('Запрашиваемый ресурс не найден');
  next(err);
};