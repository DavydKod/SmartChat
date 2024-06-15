const { findUsers, updateUser, deleteUser } = require("../services/userService");

const updateUserController = async (req, res) => {
    const userId = req.user.id;
    const { name, tag, email, currentPassword, newPassword, confirmPassword } = req.body;

    try {
        const result = await updateUser(userId, {
            name, tag, email, currentPassword, newPassword, confirmPassword
        });
        res.status(200).json(result);
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
    const { currentPassword } = req.body;

    try {
        const result = await deleteUser(userId, currentPassword);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = { updateUserController, findUsersController, deleteUserController }