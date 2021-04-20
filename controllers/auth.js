const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

const { validationResult } = require('express-validator');
let User = require('../models/User');
const { exists } = require('../models/User');

exports.signup = async(req, res)=> {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        res.status(422).json({errors: errors.array()});
    }

    let user = await User.findOne({email: req.body.email});
    if(user){
        res.status(400).json({msg: 'User with such email already exists!'});
        return;
    }

    try{
        const hashpass = await bcrypt.hash(req.body.password, 12);
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashpass
        });

        await newUser.save();
        res.status(201).json({msg: 'user was successfully created'});
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
            res.status(400).json({msg: 'User with such email doesn\'t exist!'});
            return;
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            res.status(400).json({msg: 'Invalid credentials!'});
            return;
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
                res.status(200).json({token: token, expiresIn: 1800, userId: user.id, username: user.username});
            }
        );
    }catch (err){
        res.status(500).send(err.message);
    }
};