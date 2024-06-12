const express = require("express");
const { sendMessage, getMessages } = require("../controllers/messageController");
const router = express.Router();


router.route("/newMessage").post(sendMessage);
router.route("/getMessages/:chatID").get(getMessages);

module.exports = router;