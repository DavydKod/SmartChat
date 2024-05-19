const express = require('express')
const {Signup, Login, Logout, Test} = require("../controllers/auth.controller");
const {ProtectedRoute} = require("../middlewares/auth.middleware");
const router = express.Router();

router.route('/signup').post(Signup);
router.route('/login').post(Login);
router.route('/logout').post(Logout);

// test
router.route('/test').post(ProtectedRoute, Test);


module.exports = router;