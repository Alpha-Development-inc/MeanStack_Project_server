const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    place: {
        type: String,
        required: true
    },
    country:{
        type: String,
        required: true
    },
    lat: { 
        type: Number,
        required: true
    },
    lng: { 
        type: Number,
        required: true
    },
    imagePath: { 
        type: String
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