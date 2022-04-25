const router = require('express').Router();

const {
  getUsers,
  getUserById,
  getCurrentUser,
  updateUserProfile,
  patchMeAvatar,
} = require('../controllers/user');

router.get('/users', getUsers);
router.get('/users/:userId', getUserById);

router.get('/users/me', getCurrentUser);
router.patch('/users/me', updateUserProfile);
router.patch('/users/me/avatar', patchMeAvatar);

module.exports = router;
