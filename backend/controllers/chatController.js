const chatModel = require("../models/chatModel")

const createChat = async (req, res) => {
    const userId = req.params.userId;
    const { receiverId } = req.body;
    try {
        // Check if a chat already exists
        let chat = await chatModel.findOne({
            members: { $all: [userId, receiverId] },
        });

        if (chat) {
            // Populate members' and lastMessage information if chat exists
            chat = await chatModel.findById(chat._id)
                .populate('members', '-password')
                .populate({
                    path: 'lastMessage',
                    populate: {
                        path: 'senderID',
                        select: 'name email avatar'
                    }
                });

            return res.status(200).json(chat);
        }

        // Create a new chat if it doesn't exist
        const newChat = new chatModel({
            name: "chat Name",
            members: [userId, receiverId],
        });

        const savedChat = await newChat.save();

        // Populate members' and lastMessage information for the new chat
        const populatedChat = await chatModel.findById(savedChat._id)
            .populate('members', '-password');

        res.status(200).json(populatedChat);
    } catch (error) {
        res.status(500).json(error);
    }
};

module.exports = { createChat };



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