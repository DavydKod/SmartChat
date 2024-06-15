const createError = require("http-errors");
const chatModel = require('../models/chatModel')
const userModel = require('../models/userModel')

const doesConversationExist = async (
    sender_id,
    receiver_id,
    isGroup
) => {
    if (isGroup === false) {
        let convos = await chatModel.find({
            isGroup: false,
            $and: [
                { members: { $elemMatch: { $eq: sender_id } } },
                { members: { $elemMatch: { $eq: receiver_id } } },
            ],
        })
            .populate("members", "-password")
            .populate("lastMessage");

        if (!convos)
            throw createError("Oops...Something went wrong !");

        //populate message model
        convos = await userModel.populate(convos, {
            path: "lastMessage.senderId",
            select: "name tag email avatar",
        });

        return convos[0];
    } else {
        //it's a group chat
        let convo = await chatModel.findById(isGroup)
            .populate("members admins", "-password")
            .populate("lastMessage");

        if (!convo)
            throw createError("Oops...Something went wrong !");
        //populate message model
        convo = await userModel.populate(convo, {
            path: "lastMessage.senderId",
            select: "name tag email avatar",
        });

        return convo;
    }
};

const createConversation = async (data) => {
    const newConvo = await chatModel.create(data);
    if (!newConvo)
        throw createError("Oops...Something went wrong !");
    return newConvo;
};

const populateConversation = async (
    id,
    fieldToPopulate,
    fieldsToRemove
) => {
    const populatedConvo = await chatModel.findOne({ _id: id }).populate(
        fieldToPopulate,
        fieldsToRemove
    );
    if (!populatedConvo)
        throw createError("Oops...Something went wrong !");
    return populatedConvo;
};

const getUserConversations = async (user_id) => {
    let conversations;
    await chatModel.find({
        users: { $elemMatch: { $eq: user_id } },
    })
        .populate("members", "-password")
        .populate("admins", "-password")
        .populate("lastMessage")
        .sort({ updatedAt: -1 })
        .then(async (results) => {
            results = await userModel.populate(results, {
                path: "lastMessage.senderId",
                select: "name tag email avatar",
            });
            conversations = results;
        })
        .catch((err) => {
            throw createError("Oops...Something went wrong !");
        });
    return conversations;
};

const updateLastMessage = async (convo_id, msg) => {
    const updatedConvo = await chatModel.findByIdAndUpdate(convo_id, {
        lastMessage: msg,
    });
    if (!updatedConvo)
        throw createError("Oops...Something went wrong !");

    console.log("updated")
    return updatedConvo;
};

module.exports = { doesConversationExist, createConversation, populateConversation, getUserConversations, updateLastMessage}