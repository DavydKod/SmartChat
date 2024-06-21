const mongoose = require("mongoose");
const Message = require("../../../backend/models/messageModel");
const Chat = require("../../../backend/models/chatModel");
const User = require("../../../backend/models/userModel");

describe("Message Model", () => {
  beforeAll(async () => {
    await mongoose.connect("mongodb://127.0.0.1:27017/testdb", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    await Message.deleteMany({});
    await Chat.deleteMany({});
    await User.deleteMany({});
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    await Message.deleteMany({});
    await Chat.deleteMany({});
    await User.deleteMany({});
  });

  it("should create a new message correctly", async () => {
    const user = new User({
      name: "Test User",
      email: "test@example.com",
      password: "password123",
      tag: "User1",
    });
    const savedUser = await user.save();

    const chat = new Chat({
      name: "Test Chat",
      isGroup: false,
      members: [{ user: savedUser._id }],
    });
    const savedChat = await chat.save();

    const message = new Message({
      senderID: savedUser._id,
      chatID: savedChat._id,
      text: "Hello, world!",
      content: ["image.jpg"],
    });
    const savedMessage = await message.save();

    expect(savedMessage._id).toBeDefined();
    expect(savedMessage.senderID.toString()).toBe(savedUser._id.toString());
    expect(savedMessage.chatID.toString()).toBe(savedChat._id.toString());
    expect(savedMessage.text).toBe("Hello, world!");
    expect(savedMessage.content).toEqual(["image.jpg"]);
  });

  it("should require senderID, chatID, and text fields", async () => {
    const messageWithoutRequiredFields = new Message({
      content: ["image.jpg"],
    });

    let error;
    try {
      await messageWithoutRequiredFields.validate();
    } catch (err) {
      error = err;
    }

    expect(error).toBeDefined();
    expect(error.errors.senderID).toBeDefined();
    expect(error.errors.chatID).toBeDefined();
    expect(error.errors.text).toBeDefined();
  });
});
