module.exports.Signup = async (req, res, next) => {
    try {
        res.send(req.body);

    } catch (error) {
        next(error);
    }
};

module.exports.Login = async (req, res, next) => {
    try {

    } catch (error) {
        next(error);
    }
};

module.exports.Logout = async (req, res, next) => {
    try {

    } catch (error) {
        next(error);
    }
};

module.exports.RefreshToken = async (req, res, next) => {
    try {

    } catch (error) {
        next(error);
    }
};