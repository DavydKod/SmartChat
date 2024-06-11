const chatModel = require("../models/chatModel")

const createChat = async (req, res) => {
    const { senderId, receiverId } = req.body;
    try {
        // check if a chat already exists
        const chat = await chatModel.findOne({
            members: { $all: [senderId, receiverId] },
        });

        if (chat) return res.status(200).json(chat);

        const newChat = new chatModel({
            name: "chat Name",
            members: [senderId, receiverId],
        });

        const savedChat = await newChat.save();

        // Populate members' information
        const populatedChat = await chatModel.findById(savedChat._id)
            .populate('members', '-password');

        res.status(200).json(populatedChat);
    } catch (error) {
        res.status(500).json(error);
    }
};


const userChats = async (req, res) => {
    const userId = req.params.userId;

    try {
        const chats = await chatModel.find({
            members: { $in: [userId] },
        })
            .populate('members', '-password')
            .populate({
                path: 'lastMessage',
                populate: {
                    path: 'senderID',
                    select: 'name email avatar'
                }
            });

        res.status(200).json(chats);
    } catch (error) {
        res.status(500).json(error);
    }
};


module.exports = { createChat, userChats };