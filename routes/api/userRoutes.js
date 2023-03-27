const router = require('express').Router();

const { createUser, getSingleUser } = require('../../controllers/userController');

router.route('/').get(getSingleUser).post(createUser);

module.exports = router;