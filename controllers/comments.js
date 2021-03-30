const { validationResult } = require('express-validator');

let Post = require('../models/Post');

exports.createComment = async (req, res) => {
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            res.status(422).json({errors: errors.array()});
        }

        const post = await Post.findById(req.body.postID);
        if(!post){
            res.status(404).send('Post not found');
        }

        const newComment = {
            userId: req.user.id,
            username: req.user.username,
            comment: req.body.comment
        };
        post.comments.push(newComment);
        const result = await post.save();
        res.send(result);
    }catch (err){
        res.status(500).send('Server error');
    }
};

exports.deleteComment = async(req, res) => {
    try{
        const post = await Post.findById(req.body.postID);
        if(!post){
            res.status(404).send('Post not found');
        }
        const comment = post.comments[req.body.commentindex];
        if(post.user != req.user.id && comment.userId != req.user.id){
            res.status(404).send("You don't have permission to delete this post");
        }
        else{
            post.comments.splice(req.body.commentindex, 1);
            const result = await post.save();
            res.send(result);
        }
        
    }catch (err){
        res.status(500).send('Something is wrong with deleting');
    }
};

exports.editComment = async(req, res)=> {
    try{
        const post = await Post.findById(req.body.postID);
        if(!post){
            res.status(404).send('Post not found');
        }
        const comment = post.comments[req.body.commentindex];
        if(post.user != req.user.id && comment.userId != req.user.id){
            res.status(404).send("You don't have permission to edit this post");
        }
        else{
            post.comments[req.body.commentindex].comment = req.body.comment;
            const result = await post.save();
            res.send(result);
        }
        
    }catch (err){
        res.status(500).send('Something is wrong with editing');
    }
};
