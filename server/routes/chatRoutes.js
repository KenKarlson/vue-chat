const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');

// History?
router.get('/messages', chatController.getMessages);

module.exports = router;