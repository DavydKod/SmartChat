const MessageModel  = require("../models/messageModel");
const {createError} = require("http-errors");


const createMessage = async (data) => {
    console.log(data)
    let msg = await MessageModel.create(data);

    if (!msg) {
        throw createError("Error: Cannot create new message")
    }
    return msg;
};

const populateMessage = async (id) => {
    let msg = await MessageModel.findById(id)
        .populate({
            path: "senderID",
            select: "name tag avatar",
            model: "User",
        })
        .populate({
            path: "chatID",
            select: "name isGroup members",
            model: "Chat",
            populate: {
                path: "members.user",
                select: "name tag email avatar",
                model: "User",
            },
        });
    if (!msg) {
        throw createError("Error: Cannot populate message")
    }
    return msg;
};

const getChatMessages = async (chatID) => {
    const messages = await MessageModel.find({ chatID: chatID })
        .populate("senderID", "name tag email avatar")
        .populate("chatID");
    if (!messages) {
        throw createError("Error: Cannot get messages")
    }
    return messages;
};

module.exports = { createMessage, populateMessage, getChatMessages }