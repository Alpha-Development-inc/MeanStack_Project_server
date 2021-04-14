const { validationResult } = require('express-validator');

let Post = require('../models/Post');

exports.getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find();
        res.send(posts);
    } catch (err) {
        res.status(500).send('Cannot get posts');
    }
};

exports.createPost = async (req, res) => {
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            res.status(422).json({errors: errors.array()});
        }

        const newPost = new Post({
            title: req.body.title,
            place: req.body.place,
            category:req.body.category,
            country: req.body.country,
            description: req.body.description,
            lat: req.body.lat,
            lng: req.body.lng,
            userid: req.user.id,
            username: req.user.username
        });

        if (req.file){
            const url = req.protocol + '://' + req.get('host');
            newPost.imagePath = url + '/images/' + req.file.filename;
        }

        const result = await newPost.save();
        res.status(201).send(result);
    }catch (err){
        res.status(500).send('Something is wrong with posting');
    }
};

exports.deletePost = async(req, res) => {
    try{
        const deletePost = await Post.findById(req.body.id);
        if(!deletePost){
            res.status(404).send('Post not found');
        }
        if(deletePost.user != req.user.id){
            res.status(404).send("You don't have permission to delete this post");
        }
        else{
            const result = await Post.findByIdAndDelete(req.body.id);
            res.send(result);
        }
        
    }catch (err){
        res.status(500).send('Something is wrong with deleting');
    }
};

exports.editPost = async(req, res)=> {
    try{
        const updatePost = await Post.findById(req.body.id);
        if (!updatePost){
            res.status(404).send('Post not found');
        }
        updatePost.title = req.body.title;
        updatePost.country = req. body.country;
        updatePost.description = req.body.description;
        updatePost.publicDate = req.body.publicDate;

        await updatePost.save();
        res.send(updatePost);
    }catch (err){
        res.status(500).send('Something is wrong with editing');
    }
};

exports.likePost = async(req, res) => {
    try{
        const updatePost = await Post.findById(req.body.postID);
        if (!updatePost){
            res.status(404).send('Post not found');
        }

        const likes = updatePost.likes;
        const like = likes.find(l => l.userId == req.user.id);

        if (!like){
            updatePost.likes.push({
                userId: req.user.id,
                username: req.user.username
            })
            await updatePost.save();
            res.status(200).json({msg: 'like is created', userId: req.user.id});
        }
        else{
            updatePost.likes = updatePost.likes.filter(l => l.userId != req.user.id);
            updatePost.save();
            res.status(200).json({msg: 'like is removed'});
        }

    }catch (err){
        res.status(500).send('Something is wrong with editing');
    }
}

exports.getUsersPosts = async(req, res) =>{
    try{
        const posts = await Post.find({
            userId: req.params.userId
        }).exec();
        res.status(200).send(posts);
    }catch{
        res.status(500).send('Cannot get posts of this user');
    }
}