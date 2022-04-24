const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const validator = require('validator');
const {
  getUsers,
  getUserById,
  createUser,
  getCurrentUser,
  updateUserProfile,
  patchMeAvatar,
  login,
} = require('../controllers/user');
const { AVATAR_REGEX } = require('../constants');

router.get('/users', getUsers);
router.get('/users/:userId', getUserById);

router.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    email: Joi.string().required().custom((value, helpers) => {
      if (validator.isEmail(value)) {
        return value;
      }
      return helpers.message('Некорректный email');
    }),
    password: Joi.string().required(),
    avatar: Joi.string().custom((value, helpers) => {
      if (AVATAR_REGEX.test(value)) {
        return value;
      }
      return helpers.message('Некорректная ссылка');
    }),
  }),
}), createUser);

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().custom((value, helpers) => {
      if (validator.isEmail(value)) {
        return value;
      }
      return helpers.message('Некорректный email');
    }),
    password: Joi.string().required(),
  }),
}), login);

router.get('/users/me', getCurrentUser);
router.patch('/users/me', updateUserProfile);
router.patch('/users/me/avatar', patchMeAvatar);

module.exports = router;
