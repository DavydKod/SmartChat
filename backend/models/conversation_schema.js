import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    isGroup: { type: Boolean, default: false },
    users: [],
    admins: [],
    owner: { type: mongoose.userSchema.ObjectId, required: true },
    //lastMessage
  },
  { timestamps: true, collection: "conversations" }
);

const Conversations = mongoose.model("Conversations", conversationSchema);

export default Conversations;
