const {CreateUserFunction, LoginUserFunction} =require("../services/auth.service")
const {GenerateToken} = require("../services/token.service");

module.exports.Signup = async (req, res, next) => {
    try {
        const { name, email, avatar, password } = req.body;
        const newUser = await CreateUserFunction({
            name,
            email,
            avatar,
            password,
        });

        const accessToken = await GenerateToken(newUser._id, res);

        res.json({
            message: "Signup Successful!",
            accessToken,
            user: {
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                avatar: newUser.avatar,
            },
        });
    } catch (error) {
        next(error);
    }
};

module.exports.Login = async (req, res, next) => {
    try {
        const {email, password} = req.body;
        const user = await LoginUserFunction(email, password);

        const accessToken = await GenerateToken(user._id, res);

        res.json({
            message: "Login Successful!",
            accessToken,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                avatar: user.avatar,
            },
        });
    } catch (error) {
        next(error);
    }
};

module.exports.Logout = async (req, res, next) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        next(error);
    }
};

module.exports.Test = async (req, res, next) => {
    try {
        res.json("Works fine.  ")
    } catch (error) {
        next(error);
    }
};