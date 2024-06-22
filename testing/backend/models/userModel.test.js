const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../../../backend/models/userModel");

describe("User Model", () => {
  beforeAll(async () => {
    await mongoose.connect("mongodb://127.0.0.1:27017/testdb", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    await User.deleteMany({});
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    await User.deleteMany({});
  });

  it("should create a new user correctly", async () => {
    const userData = {
      name: "Test User",
      tag: "testuser",
      email: "test@example.com",
      avatar: "avatar.jpg",
      password: "password123",
    };

    const user = new User(userData);
    const savedUser = await user.save();

    expect(savedUser._id).toBeDefined();
    expect(savedUser.name).toBe(userData.name);
    expect(savedUser.tag).toBe(userData.tag);
    expect(savedUser.email).toBe(userData.email);
    expect(savedUser.avatar).toBe(userData.avatar);
    expect(savedUser.password).not.toBe(userData.password);
  });

  it("should require name, tag, email, and password fields", async () => {
    const userWithoutRequiredFields = new User({
      avatar: "avatar.jpg",
    });

    let error;
    try {
      await userWithoutRequiredFields.validate();
    } catch (err) {
      error = err;
    }

    expect(error).toBeDefined();
    expect(error.errors.name).toBeDefined();
    expect(error.errors.tag).toBeDefined();
    expect(error.errors.email).toBeDefined();
    expect(error.errors.password).toBeDefined();
  });
});
