const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

const { validationResult } = require('express-validator');
let User = require('../models/User');

exports.signup = async(req, res)=> {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        res.status(422).json({errors: errors.array()});
    }

    try{
        const hashpass = await bcrypt.hash(req.body.password, 12);
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashpass
        });

        await newUser.save();
        res.status(201).json({msg: 'user was successfully created', hashpass: hashpass});
    }catch(err){
        res.status(500).send(err.message);
    }
};

exports.login = async (req, res) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        res.status(422).json({errors: errors.array()});
    }

    const{email, password} = req.body;

    try{
        let user = await User.findOne({email});
        if(!user){
            res.status(400).json({errors: [{msg: 'Invalid email'}]});
        }


        const passwordTry = await bcrypt.hash(password, 12);
        // res.json({hashpass: user.password, newOne: passwordTry, original: password});

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            res.status(400).json({errors: [{msg: 'Invalid password', hash: passwordTry}]});
        }

        const payload ={
            user:{
                id: user.id,
                username: user.username
            }
        };

        jwt.sign(
            payload,
            config.get('jwtsecret'),
            {expiresIn: 60*30},
            (err, token) =>{
                if(err) throw err;
                res.json({token});
            }
        );
    }catch (err){
        res.status(500).send(err.message);
    }
};