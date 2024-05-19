const jwt = require("jsonwebtoken");
const User = require("../models/user_schema");

module.exports.ProtectedRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;

        if (!token) {
            return res.status(401).json({ error: "Unauthorized Access." });
        }

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        if (!decodedToken) {
            return res.status(401).json({ error: "Unauthorized Access." });
        }

        const user = await User.findById(decodedToken.userId).select("-password");

        if (!user) {
            return res.status(404).json({ error: "User Not Found" });
        }

        req.user = user;

        next();

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};
