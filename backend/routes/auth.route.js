const express = require('express')
const {Signup, Login, Logout, RefreshToken} = require("../controllers/auth.controller");
const router = express.Router();

router.route('/signup').post(Signup);
router.route('/login').post(Login);
router.route('/logout').post(Logout);
router.route('/refreshToken').post(RefreshToken);

module.exports = router;