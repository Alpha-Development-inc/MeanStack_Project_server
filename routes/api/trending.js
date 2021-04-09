const express = require('express');
const { check, validationResult } = require('express-validator');
let Post = require('../../models/Post');

const auth = require('../../middleware/auth');
let top10=null;

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const post = await Post.find();
    post.forEach(function (value) {
        console.log(value.likes.length);
        post.sort(function(a,b){
            return b.likes.length - a.likes.length;
       });
       post.slice(0,9);
       console.log(post);
       
      });
    res.send(post);
  } catch (err) {
    res.status(500).send('Server error');
  }
});


module.exports = router;
