const express = require('express');
const { check } = require('express-validator');

const router = express.Router();
const auth = require('../../middleware/auth');
const CommentController = require('../../controllers/comments');


router.post('/', auth,
    [
        check('comment', 'Comment cannot be empty').not().isEmpty()
    ],
    CommentController.createComment
);

router.delete('/', auth, CommentController.deleteComment);

router.put('/', auth, CommentController.editComment);

module.exports = router;