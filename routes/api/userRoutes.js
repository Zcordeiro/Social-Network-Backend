const router = require('express').Router();

const { createUser, getAllUser, updateUser } = require('../../controllers/userController');

router.route('/').get(getAllUser).post(createUser).put(updateUser);

module.exports = router;