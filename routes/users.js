const router = require('express').Router();

const {
  getUsers,
  getUser,
  updateUser,
  updateAvatar,
  getCurrentUser,
} = require('../controllers/users');

const { validationUserId, validationUpdateUser, validationUpdateAvatar } = require('../middlewares/validations');

router.get('/', getUsers);

router.get('/me', getCurrentUser);

router.get('/:userId', validationUserId, getUser);

router.patch('/me', validationUpdateUser, updateUser);

router.patch('/me/avatar', validationUpdateAvatar, updateAvatar);

module.exports = router;
