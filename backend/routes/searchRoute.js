const express = require('express')
const router = express.Router();

const { AuthMiddleware } = require("../middlewares/auth.middleware");
const { searchUsers } = require("../controllers/searchController");

router.route("/").get(AuthMiddleware, searchUsers);
module.exports = router;