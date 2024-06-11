const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    senderID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    chatID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Chat',
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    content: [],
  },
  { timestamps: true, collection: "messages" }
);

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
