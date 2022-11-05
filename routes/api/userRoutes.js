const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  addFriend,
  removeFriend,
} = require('../../controllers/userController');

// /api/users
// GET and POST routes
router.route('/').get(getUsers).post(createUser);

// /api/users/:userId
//GET route
// TODO: add PUT and DELETE routes
// router.route('/:userId').get(getSingleUser).put(getSingleUser).delete(getSingleUser);
router.route('/:userId').get(getSingleUser);

// /api/users/:userId/friends/:friendId
// TODO: POST and DELETE routes
router.route('/:userId/friends/:friendId')
  .post(addFriend)
  .delete(removeFriend);

module.exports = router;
