const express = require('express')
const router = express.Router();
//const { openChat, getChats} = require("../controllers/chatController");
const { createChat, userChats} = require("../controllers/chatController");


router.route('/openChat').post(createChat)
router.route('/userChats/:userId').get(userChats)
//router.route('/find/:senderId/:receiverId').get(findChat)


module.exports = router;