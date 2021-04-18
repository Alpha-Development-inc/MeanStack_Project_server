const express = require('express');
const { check, validationResult } = require('express-validator');

let Post = require('../../models/Post');
const router = express.Router();
router.get('/:category', async (req, res) => {
  try {
    const posts = await Post.find({
        category: req.params.category
    }).exec();
    res.status(200).send(posts);
} catch {
    res.status(500).send('Cannot get posts of this user');
}
  });
module.exports = router;