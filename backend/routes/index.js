const express = require('express')
const authRotes = require('./auth.route')
const router = express.Router();

router.use('/auth', authRotes);

module.exports = router;