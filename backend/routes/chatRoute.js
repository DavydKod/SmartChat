const express = require('express')
const router = express.Router();
//const { openChat, getChats} = require("../controllers/chatController");
const { createChat, userChats} = require("../controllers/chatController");
const { AuthMiddleware } = require("../middlewares/auth.middleware");


router.route('/openChat/:userId').post(createChat)
router.route('/userChats/:userId').get(AuthMiddleware, userChats)
//router.route('/find/:senderId/:receiverId').get(findChat)


module.exports = router;