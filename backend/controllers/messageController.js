const MessageModel = require('../models/messageModel')
const mongoose = require('mongoose');
const { updateLatestMessage } = require("../services/chatService")
const { createMessage, populateMessage, getChatMessages } = require('../services/mesageService');

const sendMessage = async (req, res, next) => {
    try {
        //const userID = req.user.userId;
        const { userID, chatID, message, content } = req.body;
        if (!chatID || (!message && !content)) {
            res.status(200).json("Error");
        }
        const msgData = {
            senderID: userID,
            text: message,
            chatID: chatID,
            content: content || [],
        };
        let newMessage = await createMessage(msgData);
        let populatedMessage = await populateMessage(newMessage._id);
        await updateLatestMessage(chatID, newMessage);
        res.json(populatedMessage);
    } catch (error) {
        next(error);
    }
};

const getMessages = async (req, res, next) => {
    try {
        const chatID = req.params.chatID;
        if (!chatID) {
            res.status(200).json("No chat id");
        }
        const messages = await getChatMessages(chatID);
        res.json(messages);
    } catch (error) {
        next(error);
    }
};

module.exports = { sendMessage, getMessages }