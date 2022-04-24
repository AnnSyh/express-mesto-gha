const router = require('express').Router();
const {
  getUsers,
  getUserById,
  postUsers,
  updateUserProfile,
  patchMeAvatar,
  login,
} = require('../controllers/user');

router.get('/users', getUsers);
router.get('/users/:userId', getUserById);
router.post('/signup', postUsers);
router.post('/signin', login);

router.patch('/users/me', updateUserProfile);
router.patch('/users/me/avatar', patchMeAvatar);

module.exports = router;
