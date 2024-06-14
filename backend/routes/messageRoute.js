const express = require("express");
const { sendMessage, getMessages } = require("../controllers/messageController");
const router = express.Router();
const { AuthMiddleware } = require("../middlewares/auth.middleware");


router.route("/sendMessage").post(AuthMiddleware, sendMessage);
router.route("/getMessages/:chatID").get(getMessages);

module.exports = router;