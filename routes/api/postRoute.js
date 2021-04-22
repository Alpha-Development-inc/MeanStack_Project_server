const express = require('express');
const { check } = require('express-validator');
const router = express.Router();
const auth = require('../../middleware/auth');
const PostController = require('../../controllers/posts');
const extractFile = require('../../middleware/file');


router.get('/', PostController.getAllPosts);

router.get('/:postID', PostController.getPostById);

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