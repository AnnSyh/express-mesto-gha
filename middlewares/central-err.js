const { ERROR_CODE_INTERNAL } = require('../constants');

module.exports = (err, req, res, next) => {
  const { statusCode = ERROR_CODE_INTERNAL, message } = err;
  res
    .status(statusCode)
    .send({
      message: statusCode === ERROR_CODE_INTERNAL
        ? `err.name = ${err.name} ; Ошибка по умолчанию.`
        : message,
    });
  return next();
};
