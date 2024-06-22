const createError = require("http-errors");
const mongoose = require("mongoose");
const chatModel = require('../models/chatModel')
const userModel = require('../models/userModel')


const createPrivateChat = async (userId, receiverId) => {

    try {
        // Check if a chat already exists
        let chat = await chatModel.findOne({
            'members.user': { $all: [userId, receiverId] },
            isGroup: false
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

            return chat;
        }

        // Create a new chat if it doesn't exist
        const newChat = new chatModel({
            name: "chat Name",
            isGroup: false,
            members: [
                { user: userId, role: 'owner' },
                { user: receiverId, role: 'user' }
            ],
        });

        const savedChat = await newChat.save();

        // Populate members' and admins' information for the new chat
        return await chatModel.findById(savedChat._id)
            .populate('members.user', '-password');

    } catch (error) {
        throw new Error("Cannot open or creat a new chat");
    }
};

const createGroupChat = async (userId, memberIds, chatName) => {
    try {
        // Check if a group chat already exists with the exact same members
        /*let chat = await chatModel.findOne({
            'members.user': { $all: [userId, ...memberIds] },
            isGroup: true
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

            return chat;
        }*/

        // Create a new group chat
        const members = [
            { user: userId, role: 'owner' },
            ...memberIds.map(id => ({ user: id, role: 'user' }))
        ];

        const newChat = new chatModel({
            name: chatName,
            isGroup: true,
            members: members
        });

        const savedChat = await newChat.save();

        // Populate members' information for the new group chat
        return await chatModel.findById(savedChat._id)
            .populate('members.user', '-password');

    } catch (error) {
        throw new Error("Cannot create a new group chat");
    }
};

// Service to find and return a chat by its chatId
const openExistingChat = async (chatId) => {
    const chat = await chatModel.findById(chatId)
        .populate('members.user', '-password')
        .populate({
            path: 'lastMessage',
            populate: {
                path: 'senderID',
                select: 'name tag email avatar'
            }
        });
    return chat
};

const addMembers = async (chatId, memberIds) => {
    try {
        // Find the existing chat by its ID
        let chat = await chatModel.findById(chatId);

        if (!chat) {
            throw new Error("Chat not found");
        }

        // Check if the members to be added are already in the chat
        const existingMemberIds = chat.members.map(member => member.user.toString());
        const newMembers = memberIds.filter(id => !existingMemberIds.includes(id))
            .map(id => ({ user: id, role: 'user' }));

        if (newMembers.length === 0) {
            return await chatModel.findById(chatId)
                .populate('members.user', '-password')
                .populate({
                    path: 'lastMessage',
                    populate: {
                        path: 'senderID',
                        select: 'name tag email avatar'
                    }
                });
        }

        // Add new members to the chat
        chat.members.push(...newMembers);
        const updatedChat = await chat.save();

        // Populate members' information for the updated chat
        return await chatModel.findById(updatedChat._id)
            .populate('members.user', '-password')
            .populate({
                path: 'lastMessage',
                populate: {
                    path: 'senderID',
                    select: 'name tag email avatar'
                }
            });

    } catch (error) {
        throw new Error("Cannot add new members to the chat");
    }
};

const updateLastMessage = async (convo_id, msg) => {
    const chat = await chatModel.findByIdAndUpdate(convo_id, {
        lastMessage: msg,
    });
    if (!chat)
        throw createError("Oops...Something went wrong !");

    console.log("updated")
    return chat;
};

// Service to update a user's role
const updateUserRole = async (chatId, userId, role) => {
    await chatModel.updateOne(
        { _id: chatId, 'members.user': userId },
        { $set: { 'members.$.role': role } }
    );
};

const removeUserFromChat = async (chatId, userId) => {
    await chatModel.updateOne(
        { _id: chatId },
        { $pull: { members: { user: userId } } }
    );
};

const deleteChatService = async (chatId) => {
    await chatModel.findByIdAndDelete(chatId);
};

const changeGroupNameService = async (chatId, newName) => {
    const chat = await chatModel.findById(chatId);

    if (!chat || !chat.isGroup) {
        throw new Error('Group chat not found');
    }

    chat.name = newName;
    await chat.save();

    return chat;
};


module.exports = { createPrivateChat, createGroupChat, openExistingChat, addMembers, updateLastMessage,
    updateUserRole, removeUserFromChat, deleteChatService, changeGroupNameService }