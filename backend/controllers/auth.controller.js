const {CreateUserFunction, LoginUserFunction} =require("../services/auth.service")
const {GenerateToken} = require("../services/token.service");

const register = async (req, res, next) => {
    try {
        const { name, tag, email, avatar, password } = req.body;
        const user = await CreateUserFunction({
            name, tag, email, avatar, password,
        });

        const accessToken = await GenerateToken(user._id, res);

        res.json({
            message: "Registration successful!",
            accessToken,
            user: {
                _id: user._id,
                name: user.name,
                tag: user.tag,
                email: user.email,
                avatar: user.avatar,
                token: accessToken,
            },
        });
    } catch (error) {
        next(error);
    }
};

const login = async (req, res, next) => {
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
                tag: user.tag,
                email: user.email,
                avatar: user.avatar,
                token: accessToken,
            },
        });
    } catch (error) {
        next(error);
    }
};

const logout = async (req, res, next) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({ message: "Logged out successfully!" });
    } catch (error) {
        next(error);
    }
};

module.exports = { register, login, logout }

