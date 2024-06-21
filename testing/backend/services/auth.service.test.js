const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const userModel = require("../../../backend/models/userModel");
const {
  CreateUserFunction,
} = require("../../../backend/services/auth.service");

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

beforeEach(async () => {
  await userModel.deleteMany({});
});

describe("CreateUserFunction", () => {
  it("should throw an error if required fields are missing", async () => {
    const userData = {
      name: "John Doe",
      email: "john@example.com",
      password: "password123",
    };
    await expect(CreateUserFunction(userData)).rejects.toThrow(
      "All fields must be filled!"
    );
  });

  it("should throw an error if email already exists", async () => {
    const userData = {
      name: "John Doe",
      tag: "johndoe",
      email: "john@example.com",
      avatar: "avatar.png",
      password: "password123",
    };
    await new userModel(userData).save();
    await expect(CreateUserFunction(userData)).rejects.toThrow(
      "Account already exists. Try a different email or login."
    );
  });

  it("should create a new user if data is valid", async () => {
    const userData = {
      name: "John Doe",
      tag: "johndoe",
      email: "john@example.com",
      avatar: "avatar.png",
      password: "password123",
    };
    const user = await CreateUserFunction(userData);
    expect(user).toHaveProperty("_id");
    expect(user.name).toBe(userData.name);
    expect(user.tag).toBe(userData.tag);
    expect(user.avatar).toBe(userData.avatar);
  });
});
