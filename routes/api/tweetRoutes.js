const express = require('express');

const router = express.Router();
const TweetController = require('../../controllers/tweets');


router.get('/', TweetController.streamTweets);


module.exports = router;
