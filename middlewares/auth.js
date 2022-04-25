const jwt = require('jsonwebtoken');
const { SEKRET_KEY } = require('../constants');
const BadAuthError = require('../errors/bad-auth-err');

module.exports = (req, res, next) => {
  // достаём авторизационный заголовок
  const { authorization } = req.headers;
  // убеждаемся, что он есть или начинается с Bearer
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res
      .status(401)
      .send({ message: 'Необходима авторизация' });
  }
  // извлечём токен
  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    // попытаемся верифицировать токен
    payload = jwt.verify(token, SEKRET_KEY);
  } catch (err) {
    throw new BadAuthError('Необходима авторизация.');
  }

  req.user = payload; // записываем пейлоуд в объект запроса
  console.log('req.user = ', req.user);
  return next(); // пропускаем запрос дальше
};
