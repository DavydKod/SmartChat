const express = require('express')
const authRoutes = require('./authRoute')
const chatRoutes = require('./chatRoute')
const messageRoutes = require('./messageRoute')
const router = express.Router();

router.use('/auth', authRoutes);
router.use('/chat', chatRoutes);
router.use('/message', messageRoutes);

module.exports = router;