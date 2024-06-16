const chatModel = require("../models/chatModel");
const mongoose = require("mongoose");
const { createChatService } = require("../services/chatService")

const createChat = async (req, res) => {
    const userId = req.params.userId;
    const { memberIds, isGroup, chatName } = req.body;

    try {

        let chat;
        if (isGroup) {
            // create group chat
            chat = await createGroupChat(userId, memberIds, chatName);

        } else if (!isGroup && memberIds.length === 1) {
            // create private chat
            const receiverId = memberIds[0];
            chat = await createChatService(userId, receiverId);

        } else {
            return res.status(400).json({ message: "Failed to create chat. Invalid input" });
        }

        if (chat) {
            return res.status(200).json(chat);
        } else {
            return res.status(500).json({ message: "Failed to create chat." });
        }

    } catch (error) {
        console.error("Error creating or finding chat:", error);
        return res.status(500).json({ message: error.message });
    }
};

const userChats = async (req, res) => {
    const userId = req.params.userId;
    const userObjectId = new mongoose.Types.ObjectId(userId);

    try {
        const chats = await chatModel.find({
            'members.user': { $in: [userObjectId] }
        })
            .populate('members.user', '-password')
            .populate({
                path: 'lastMessage',
                populate: {
                    path: 'senderID',
                    select: 'name tag email avatar'
                }
            });

        res.status(200).json(chats);
    } catch (error) {
        console.error("Error finding user chats:", error);
        res.status(500).json(error);
    }
};


module.exports = { createChat, userChats };