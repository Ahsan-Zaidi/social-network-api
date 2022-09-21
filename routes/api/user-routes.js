//required filed from express
const router = require('express').Router();

const {
    getAllUser,
    getUserById,
    createUser,
    updateUserById,
    deleteUserById,
    addFriendstoList,
    removeFriend
} = require('../../controllers/user-controller');

//user get Routes
router
.route('/')
.get(getAllUser)
.post(createUser);

//User crud operations that require "id"
router.route('/:id')
.get(getUserById)
.put(updateUserById)
.delete(deleteUserById)

router.route('/:userId/friends/:friendId')
.post(addFriendstoList)
.delete(removeFriend)

module.exports = router;