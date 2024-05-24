const jwt = require("jsonwebtoken");

module.exports.GenerateToken = (userId, res) => {
    const token = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "30d",
    });

    res.cookie("jwt", token, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
        secure: false,
    });

    return token;
};