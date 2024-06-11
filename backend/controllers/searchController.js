const createError = require("http-errors");

const { findUsers } = require("../services/searchService");
const searchUsers = async (req, res, next) => {
    try {
        //const userId = req.body
        const keyword = req.query.search;
        if (!keyword) {
            throw createError("Oops...Something went wrong !");
        }
        const users = await findUsers(keyword, req.user.id);
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
};

module.exports = { searchUsers }