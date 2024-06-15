const express = require('express')
const router = express.Router();

const { AuthMiddleware } = require("../middlewares/auth.middleware");
const { findUsersController, updateUserController, deleteUserController } = require("../controllers/userController");

router.route("/").get(AuthMiddleware, findUsersController);
router.route("/updateUser").put(AuthMiddleware, updateUserController);
router.route("/delete").delete(AuthMiddleware, deleteUserController);

module.exports = router;