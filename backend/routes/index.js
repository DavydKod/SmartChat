const express = require('express')
const router = express.Router();

const authRoutes = require('./authRoute')
const chatRoutes = require('./chatRoute')
const messageRoutes = require('./messageRoute')
const userRoutes = require('./userRoute')


router.use('/auth', authRoutes);
router.use('/chat', chatRoutes);
router.use('/message', messageRoutes);
router.use('/user', userRoutes);

module.exports = router;