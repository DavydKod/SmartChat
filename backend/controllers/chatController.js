const chatModel = require("../models/chatModel");
const mongoose = require("mongoose");
const { createPrivateChat, createGroupChat, openExistingChat, addMembers, updateUserRole,
    removeUserFromChat, deleteChatService, changeGroupNameService } = require("../services/chatService")

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
            chat = await createPrivateChat(userId, receiverId);

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

const openChat = async (req, res) => {
    const { chatId } = req.body;

    try {
        const chat = await openExistingChat(chatId);
        if (chat) {
            return res.status(200).json(chat);
        } else {
            return res.status(404).json({ message: "Chat not found" });
        }
    } catch (error) {
        console.error("Error opening chat:", error);
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

        // Sort the chats based on the lastMessage dateCreated
        const sortedChats = chats.sort((a, b) => {
            if (!a.lastMessage) return 1;
            if (!b.lastMessage) return -1;
            return new Date(b.lastMessage.createdAt) - new Date(a.lastMessage.createdAt);
        });

        res.status(200).json(sortedChats);
    } catch (error) {
        console.error("Error finding user chats:", error);
        res.status(500).json(error);
    }
};

const changeUserRole = async (req, res) => {
    const { chatId, userId, role } = req.body;

    try {
        await updateUserRole(chatId, userId, role);
        res.status(200).json({ message: 'User role updated successfully' });
    } catch (error) {
        console.error('Error updating user role:', error);
        res.status(500).json({ message: 'Error updating user role' });
    }
};

const deleteUserFromChat = async (req, res) => {
    const { chatId, userId } = req.body;

    try {
        await removeUserFromChat(chatId, userId);
        res.status(200).json({ message: 'User removed from chat successfully' });
    } catch (error) {
        console.error('Error removing user from chat:', error);
        res.status(500).json({ message: 'Error removing user from chat' });
    }
};

const addMembersToChat = async (req, res) => {
    const { chatId, memberIds } = req.body;

    if (!chatId || !memberIds || !Array.isArray(memberIds)) {
        return res.status(400).json({ message: "Invalid request data" });
    }

    try {
        const updatedChat = await addMembers(chatId, memberIds);
        return res.status(200).json(updatedChat);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const deleteChat = async (req, res) => {
    const { chatId } = req.params;

    try {
        await deleteChatService(chatId);
        res.status(200).json({ message: 'Chat deleted successfully' });
    } catch (error) {
        console.error('Error deleting chat:', error);
        res.status(500).json({ message: 'Error deleting chat' });
    }
};

const changeGroupName = async (req, res) => {
    const { chatId, newName } = req.body;

    try {
        const updatedChat = await changeGroupNameService(chatId, newName);
        res.status(200).json({
            message: 'Group name updated successfully',
            chat: updatedChat,
        });
    } catch (error) {
        console.error('Error updating group name:', error);
        res.status(500).json({ message: 'Error updating group name' });
    }
};




module.exports = { createChat, openChat, userChats, changeUserRole, deleteUserFromChat,
    addMembersToChat, deleteChat, changeGroupName };