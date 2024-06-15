const chatModel = require("../models/chatModel");
const mongoose = require("mongoose");

const createChat = async (req, res) => {
    const userId = req.params.userId;
    const { receiverId } = req.body;

    try {
        // Convert userId and receiverId to ObjectId
        const userObjectId = new mongoose.Types.ObjectId(userId);
        const receiverObjectId = new mongoose.Types.ObjectId(receiverId);

        // Check if a chat already exists
        let chat = await chatModel.findOne({
            'members.user': { $all: [userObjectId, receiverObjectId] },
        });

        if (chat) {
            // Populate members' and lastMessage information if chat exists
            chat = await chatModel.findById(chat._id)
                .populate('members.user', '-password')
                .populate({
                    path: 'lastMessage',
                    populate: {
                        path: 'senderID',
                        select: 'name tag email avatar'
                    }
                });

            return res.status(200).json(chat);
        }

        // Create a new chat if it doesn't exist
        const newChat = new chatModel({
            name: "chat Name",
            isGroup: false,
            members: [
                { user: userObjectId, role: 'owner' },
                { user: receiverObjectId, role: 'admin' }
            ],
        });

        const savedChat = await newChat.save();

        // Populate members' and lastMessage information for the new chat
        const populatedChat = await chatModel.findById(savedChat._id)
            .populate('members.user', '-password');

        res.status(200).json(populatedChat);
    } catch (error) {
        console.error("Error creating or finding chat:", error);
        res.status(500).json({ message: error.message });
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