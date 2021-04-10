const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
    name:{
        type: String,
        requred: true
    },
    email:{
        type: String,
        required: true
    },
    message:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
});

module.exports = mongoose.model('Message', MessageSchema);