const express = require('express');
const { check, validationResult } = require('express-validator');

let Post = require('../../models/Post');
const router = express.Router();

const _ = require('lodash');



  router.get('/', async (req, res) => {
    try {
        let category = req.body.category;
        //console.log(category);
        //console.log('1');
        const posts = await Post.find();
        const result=[{}];
        let newresult=null;
        // console.log('2');
      
        //filtering things
        for (let post of posts) {
            //console.log(category);
            if (post.category === category) {
                //console.log("123");
                //console.log(post);
                newresult=[...result,post];
                //console.log(newresult);
                //console.log("1234");
                //res.send(post);
                
            }
        }
   
    //console.log(newresult);
    //console.log('2');
    
    //const posts = await Post.find().paginate({category: category}).exec();
    
    if (newresult===null) {
        
        return res.status(404).send('category posts not found');
      }
      res.json(newresult);
       //res.send(posts);
      //console.log('3');
    } catch (err) {
      res.status(500).send('Servere error');
    }
  });
module.exports = router;