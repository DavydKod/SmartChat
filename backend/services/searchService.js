const createError = require("http-errors");
const userModel = require('../models/userModel')

const findUser = async (userId) => {
    const user = await userModel.findById(userId);
    if (!user) throw createError("Please fill all fields.");
    return user;
};

const findUsers = async (keyword, userId) => {
    const users = await userModel.find({
        $or: [
            { name: { $regex: keyword, $options: "i" } },
            { email: { $regex: keyword, $options: "i" } },
        ],
    }).find({
        _id: { $ne: userId },
    });
    return users;
};

module.exports = { findUser, findUsers }