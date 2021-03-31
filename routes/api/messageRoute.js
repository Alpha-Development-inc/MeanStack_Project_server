const express = require('express');
const { check } = require('express-validator');

const router = express.Router();
const auth = require('../../middleware/auth');
const MessageController = require('../../controllers/messages');


router.get('/', MessageController.getAllMessages);

router.post('/', auth, MessageController.createMessage);

module.exports = router;