const ERROR_CODE_BAD_REQUEST = 400;
const ERROR_CODE_NOT_FOUND = 404;
const ERROR_CODE_INTERNAL = 500;

const ERROR_CODE_BAD_AUTH = 401;
const ERROR_CODE_DEL_CARD = 403;
const ERROR_CODE_EXIST_EMAIL = 409;
const SEKRET_KEY = 'some-secret-key';

const AVATAR_REGEX = /^https?:\/\/(www\.)?[a-zA-Z\d-]+\.[\w\d\-.~:/?#[\]@!$&'()*+,;=]{2,}#?$/;

module.exports = {
  ERROR_CODE_BAD_REQUEST,
  ERROR_CODE_NOT_FOUND,
  ERROR_CODE_INTERNAL,
  ERROR_CODE_BAD_AUTH,
  ERROR_CODE_DEL_CARD,
  ERROR_CODE_EXIST_EMAIL,
  SEKRET_KEY,
  AVATAR_REGEX,
};
