
const mongoose = require('mongoose');

const TweetSchema = new mongoose.Schema({

    tweetId:{
        type: String,
        requred: true
    },
    tweetText:{
        type: String,
        required: true
    },
    authorId:{
        type: String,
        required: true
    }

});

module.exports = mongoose.model('Tweet', TweetSchema);
