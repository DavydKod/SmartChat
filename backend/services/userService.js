const userModel = require('../models/userModel')
const bcrypt = require('bcrypt');

const updateUser = async (userId, { name, tag, email, currentPassword, newPassword, confirmPassword }) => {
    // Find the user by ID
    const user = await findUser(userId);

    if (!user) {
        throw new Error('User not found');
    }

    // Validate the current password
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
        throw new Error('Incorrect current password');
    }

    // Check if new passwords match
    if (newPassword !== confirmPassword) {
        throw new Error('New passwords do not match');
    }

    // Update user information
    if (name) user.name = name;
    if (tag) user.tag = tag;
    if (email) user.email = email;
    if (newPassword) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);
    }

    // Save the updated user
    await user.save();

    return { message: 'User updated successfully', user };
};

const deleteUser = async (userId, currentPassword) => {

    // Find the user by ID
    const user = await findUser(userId);

    if (!user) {
        throw new Error('User not found');
    }

    // Validate the current password
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
        throw new Error('Incorrect current password');
    }

    // Delete the user
    await userModel.findByIdAndDelete(userId);

    return { message: 'User deleted successfully' };
};

const findUser = async (userId) => {
    const user = await userModel.findById(userId);
    if (!user) {
        throw new Error("No user found");
    }
    return user;
};

const findUsers = async (keyword, userId) => {
    return userModel.find({
        $or: [
            {tag: {$regex: keyword, $options: "i"}},
            {email: {$regex: keyword, $options: "i"}},
        ],
    }).find({
        _id: {$ne: userId},
    });
};

module.exports = { findUser, findUsers, updateUser, deleteUser }