const mongoose = require("mongoose");

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
    members: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
    ],
    admins: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
    ],
    /*owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', required: true
    },*/
    lastMessage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message',
    },
  },
  { timestamps: true, collection: "chats" }
);

const Chat = mongoose.model("Chat", chatSchema);

module.exports = Chat
