const createError = require("http-errors");
const User_schema = require("../models/userModel");
const {compare} = require("bcrypt");

module.exports.CreateUserFunction = async (userData) => {
    const { name, email, avatar, password } = userData;

    // check is fields are empty
    if(!name || !email || !password) {
        throw createError(400, 'Please fill all fields');
    }
    // validate email, password and the rest

    const checkDb = await User_schema.findOne({ email });
    if(checkDb){
        throw createError(400, 'Email already exists. Try another one.');
    }

    return await new User_schema({
        name, email, avatar, password
    }).save();

};

module.exports.LoginUserFunction = async (email, password) => {
    const user = await User_schema.findOne({ email: email.toLowerCase() }).lean();

    if (!user) {
        throw createError(500, "User Not Found!");
    }

    let passwordMatches = await compare(password, user.password);

    if (!passwordMatches) {
        throw createError("Wrong password!");
    }

    return user;
};