const { validationResult } = require('express-validator');
const axios = require('axios');
const config = require('config');

let Post = require('../models/Post');

exports.createComment = async (req, res) => {
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            res.status(422).json({errors: errors.array()});
        }

        const post = await Post.findById(req.body.postID);
        if(!post){
            res.status(404).json({msg:'Post not found'});
            return;
        }

        const headers = {
            "user-id" : config.get("badWordsUserId"),
            "api-key" : config.get("badWordsApiKey"),
            "Content-Type" : "application/json"
        }

        const censorCheck = await axios.post(
            "https://neutrinoapi.net/bad-word-filter",
            {
                content: req.body.comment
            },
            {
                headers: headers
            }
        );

        const censorString = JSON.stringify(censorCheck.data);
        const censorData = JSON.parse(censorString.replace(/-/g, '')); 

        if (censorData.isbad){
            const message = "Comment hasn't passed censorship. " + censorData.badwordstotal + " bad words inside.";
            res.status(400).json({msg: message});
            return;
        }

        const newComment = {
            userId: req.user.id,
            username: req.user.username,
            comment: req.body.comment
        };
        post.comments.push(newComment);
        const result = await post.save();
        res.status(201).json({msg: 'Cooment was successfully created'});
    }catch (err){
        res.status(500).json({msg: err});
    }
};

exports.deleteComment = async(req, res) => {
    try{
        const post = await Post.findById(req.body.postID);
        if(!post){
            res.status(404).send('Post not found');
        }
        const comment = post.comments[req.body.commentindex];
        if(post.userId != req.user.id && comment.userId != req.user.id){
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
        if(post.userId != req.user.id && comment.userId != req.user.id){
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
