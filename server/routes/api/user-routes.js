const router = require('express').Router();

const { getSingleUser, createUser, login } = require('../../controllers/user-controller');

const { authMiddleware } = require('../../utils/auth');

router.route('/login').post(login);

router.route('/signup').post(createUser).put(authMiddleware);


module.exports = router;