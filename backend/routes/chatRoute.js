const express = require('express')
const router = express.Router();
//const { openChat, getChats} = require("../controllers/chatController");
const { createChat, openChat, userChats, changeUserRole, deleteUserFromChat,
    deleteChat, addMembersToChat} = require("../controllers/chatController");
const { AuthMiddleware } = require("../middlewares/auth.middleware");


router.route('/createChat/:userId').post(AuthMiddleware, createChat);
router.route('/openChat').post(AuthMiddleware, openChat);
router.route('/userChats/:userId').get(AuthMiddleware, userChats);

router.route('/updateRole').put(AuthMiddleware, changeUserRole);
router.route('/deleteUser').put(AuthMiddleware, deleteUserFromChat);
router.route('/addMembers').post(AuthMiddleware, addMembersToChat);

router.route('/deleteChat/:chatId').delete(AuthMiddleware, deleteChat);



//router.route('/find/:senderId/:receiverId').get(findChat)


module.exports = router;