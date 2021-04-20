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
    category:{
        type:String,
        required:true,  
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
    image: { 
        url: {
            type: String,
        },
        fileId : {
            type: String
        }
    },
    description:{
        type: String,
        required: true
    },
    publicDate:{
        type: Date,
        default: Date.now
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    username:{
        type: String,
        required: true
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
        },
        date:{
            type: Date,
            default: Date.now
        },
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