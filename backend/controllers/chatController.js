const chatModel = require("../models/chatModel");
const mongoose = require("mongoose");
const { createChatService } = require("../services/chatService")

const createChat = async (req, res) => {
    const userId = req.params.userId;
    const { receiverId } = req.body;

    try {
        const chat = await createChatService(userId, receiverId);
        return res.status(200).json(chat);
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