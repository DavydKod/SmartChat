import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    sender: { type: mongoose.userSchema.ObjectId, required: true }, //FK user_id
    conversation: { type: mongoose.conversationSchema.ObjectId }, //FK conversation_id
    text: { type: String, required: true },
    content: [],
  },
  { timestamps: true, collection: "messages" }
);

const Messages = mongoose.model("Messages", messageSchema);

export default Messages;
