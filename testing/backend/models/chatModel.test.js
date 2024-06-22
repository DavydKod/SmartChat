const mongoose = require("mongoose");
const Chat = require("../../../backend/models/chatModel");

describe("Chat Model", () => {
  beforeAll(async () => {
    await mongoose.connect("mongodb://127.0.0.1:27017/testdb", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }, 100000);

  afterAll(async () => {
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    await Chat.deleteMany({});
  });

  it("should create a new chat correctly", async () => {
    const newChat = new Chat({
      name: "Test Chat",
      isGroup: true,
      members: [
        { user: new mongoose.Types.ObjectId(), role: "owner" },
        { user: new mongoose.Types.ObjectId(), role: "admin" },
      ],
      lastMessage: new mongoose.Types.ObjectId(),
    });

    const savedChat = await newChat.save();

    expect(savedChat._id).toBeDefined();
    expect(savedChat.name).toBe("Test Chat");
    expect(savedChat.isGroup).toBe(true);
    expect(savedChat.members).toHaveLength(2);
    expect(savedChat.members[0].role).toBe("owner");
    expect(savedChat.members[1].role).toBe("admin");
    expect(savedChat.lastMessage).toBeDefined();
  });

  it("should require name field", async () => {
    const chatWithoutName = new Chat({
      isGroup: true,
      members: [{ user: new mongoose.Types.ObjectId(), role: "user" }],
      lastMessage: new mongoose.Types.ObjectId(),
    });

    await expect(chatWithoutName.save()).rejects.toThrow();
  });

  it("should have default value 'user' for member role", async () => {
    const chatWithDefaultRole = new Chat({
      name: "Test Chat 2",
      isGroup: true,
      members: [{ user: new mongoose.Types.ObjectId() }],
      lastMessage: new mongoose.Types.ObjectId(),
    });

    const savedChat = await chatWithDefaultRole.save();
    expect(savedChat.members[0].role).toBe("user");
  });
});
