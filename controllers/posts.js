const { validationResult } = require('express-validator');
let Post = require('../models/Post');
let User = require('../models/User');
var ImageKit = require("imagekit");

var imagekit = new ImageKit({
    publicKey : "public_T51ZcieHu28tw3BLLJOsOlvmXg8=",
    privateKey : "private_mgpxu3TS6vhtg66fad4avcyoA4A=",
    urlEndpoint : "https://ik.imagekit.io/g56fnhdh8px/"
});

exports.getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find();
        res.send(posts);
    } catch (err) {
        res.status(500).send('Cannot get posts');
    }
};

exports.getPostById = async (req, res) => {
    try {
        const post = await Post.findById(req.params.postID);
        if (!post) {
        return res.status(404).json({msg: 'Post not found'});
        }
        res.status(200).json({post: post});
    } catch (err) {
        res.status(500).send('Server error');
    }
};

exports.createPost = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(422).json({ errors: errors.array() });
        }

        const newPost = new Post({
            title: req.body.title,
            place: req.body.place,
            category: req.body.category,
            country: req.body.country,
            description: req.body.description,
            lat: req.body.lat,
            lng: req.body.lng,
            userId: req.user.id,
            username: req.user.username
        });

        if (req.body.image) {
            const resp = await imagekit.upload({
                file : req.body.image,
                fileName : Date.now(),
            });

            newPost.image = {
                url: resp.url,
                fileId: resp.fileId
            }

            console.log(resp);
        }



        const result = await newPost.save();
        res.status(201).send(result);
    } catch (err) {
        res.status(500).send('Something is wrong with posting');
    }
};

exports.deletePost = async (req, res) => {
    try {
        const deletePost = await Post.findById(req.body.id);
        if (!deletePost) {
            res.status(404).send('Post not found');
        }
        if (deletePost.userId != req.user.id) {
            res.status(404).send("You don't have permission to delete this post");
        }
        else {
            const result = await Post.findByIdAndDelete(req.body.id);
            res.status(204).json({msg: 'Post was successfully deleted'});
        }

    } catch (err) {
        res.status(500).send('Something is wrong with deleting');
    }
};

exports.editPost = async (req, res) => {
    try {
        const updatePost = await Post.findById(req.body.id);
        if (!updatePost) {
            res.status(404).send('Post not found');
        }
        if (updatePost.userId != req.user.id) {
            res.status(404).send("You don't have permission to edit post");
        } else {
            updatePost.title = req.body.title;
        updatePost.title = req.body.title;
        updatePost.country = req.body.country;
        updatePost.place = req.body.place;
        updatePost.description = req.body.description;
        updatePost.publicDate = req.body.publicDate;
        updatePost.lat = req.body.lat;
        updatePost.lng = req.body.lng;
        updatePost.category = req.body.category;

        await updatePost.save();
        res.status(200).json({msg: 'Post was successfully edited'});
        }
    } catch (err) {
        res.status(500).send('Something is wrong with editing');
    }
};

exports.likePost = async (req, res) => {
    try {
        const updatePost = await Post.findById(req.body.postID);
        if (!updatePost) {
            res.status(404).send('Post not found');
        }

        const likes = updatePost.likes;
        const like = likes.find(l => l.userId == req.user.id);

        if (!like) {
            updatePost.likes.push({
                userId: req.user.id,
                username: req.user.username
            })
            await updatePost.save();
            res.status(200).json({ msg: 'like is created', userId: req.user.id });
        }
        else {
            updatePost.likes = updatePost.likes.filter(l => l.userId != req.user.id);
            updatePost.save();
            res.status(200).json({ msg: 'like is removed' });
        }

    } catch (err) {
        res.status(500).send('Something is wrong with editing');
    }
}

exports.getUsersPosts = async (req, res) => {
    try {
        let user = await User.findById(req.params.userId);
        if(!user){
            res.status(400).json({msg: 'User was not found'});
            return;
        }
        const posts = await Post.find({
            userId: req.params.userId
        }).exec();
        res.status(200).json({username: user.username, posts: posts});
    } catch {
        res.status(500).send('Cannot get posts of this user');
    }
}
