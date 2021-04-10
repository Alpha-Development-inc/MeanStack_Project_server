const express = require('express');
const { check, validationResult } = require('express-validator');

let Post = require('../../models/Post');
const router = express.Router();
const auth = require('../../middleware/auth');
const PostController = require('../../controllers/posts');


router.get('/', PostController.getAllPosts);

router.post('/', auth,
    [
        check('title', 'Title is required').not().isEmpty(),
        check('country', 'Choose the country').not().isEmpty(),
        check('description', 'Description is required').not().isEmpty()
    ],
    PostController.createPost
);

router.delete('/', auth, PostController.deletePost);

router.put('/', auth, PostController.editPost);

router.post('/likepost', auth, PostController.likePost);

router.get('/postByUser/:userId', PostController.getUsersPosts);


module.exports = router;