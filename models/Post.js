const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    title:{
        type: String,
        requred: true
    },
    category:{
        type:String,
        required:true,
        
    },
    country:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    publicDate:{
        type: Date,
        default: Date.now
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    comments: [{
        _id : false,
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users'
        },
        username: {
            type: String
        },
        comment: {
            type: String,
            required: true
        }
    }],
    likes: [{
        _id : false,
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users'
        },
        username: {
            type: String
        },
    }]
});

module.exports = mongoose.model('Post', PostSchema);