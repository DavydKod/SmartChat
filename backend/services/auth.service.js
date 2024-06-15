const createError = require("http-errors");
const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");

module.exports.CreateUserFunction = async (userData) => {
    const { name, tag, email, avatar, password } = userData;

    // check is fields are empty
    if (!name || !tag || !email || !password) {
        throw createError(400, 'All fields must be filled!');
    }

    // validate data
    const account = await userModel.findOne({ email });
    if (account) {
        throw new Error('Account already exists. Try a different email or login.');
    }

    return await new userModel({
        name, tag, email, avatar, password
    }).save();

};

module.exports.LoginUserFunction = async (email, password) => {
    const user = await userModel.findOne({ email: email.toLowerCase() }).lean();

    if (!user) {
        throw new Error('User not found');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error('Incorrect password');
    }

    return user;
};