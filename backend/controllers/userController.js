const { findUsers, updateUser, deleteUser } = require("../services/userService");
const userModel = require('../models/userModel')

const updateUserController = async (req, res) => {
    const userId = req.user.id;
    const { name, tag, email, newPassword, token } = req.body;

    try {
        const user = await updateUser(userId, {
            name, tag, email, newPassword,
        });

        res.json({
            message: "Update Successful!",
            user: {
                _id: user._id,
                name: user.name,
                tag: user.tag,
                email: user.email,
                avatar: user.avatar,
                token: token,
            },
        });

        //res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const findUsersController = async (req, res, next) => {
    try {
        const user = req.query.search;
        const users = await findUsers(user, req.user.id);
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
};

const deleteUserController = async (req, res) => {
    const userId = req.user.id;
    //const { currentPassword } = req.body;

    try {
        const result = await deleteUser(userId);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const checkUnique = async (req, res) => {
    try {
        const { tag, email } = req.body;
        const tagExists = await userModel.findOne({ tag });
        const emailExists = await userModel.findOne({ email });

        res.json({
            tagExists: !!tagExists,
            emailExists: !!emailExists,
        });
    } catch (error) {
        console.error('Error checking unique fields:', error);
        res.status(500).json({ message: 'Error checking unique fields' });
    }
};

module.exports = { updateUserController, findUsersController, deleteUserController, checkUnique }