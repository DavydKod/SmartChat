const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        role: {
            type: String,
            enum: ['user', 'admin', 'owner'],
            default: 'user'
        }
    },
    { _id: false }
);

const chatSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        isGroup: {
            type: Boolean,
            default: false
        },
        members: [memberSchema],
        lastMessage: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Message',
        },
    },
    { timestamps: true, collection: "chats" }
);

const Chat = mongoose.model("Chat", chatSchema);

module.exports = Chat
