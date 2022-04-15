const router = require('express').Router();
const {
  getUsers,
  getUser,
  postUsers,
  patchUser,
  patchMeAvatar,
} = require('../controllers/user');

router.get('/users', getUsers);
router.get('/users/:userId', getUser);
router.post('/users', postUsers);

router.patch('/users/me', patchUser);
router.patch('/users/me/avatar', patchMeAvatar);

module.exports = router;
