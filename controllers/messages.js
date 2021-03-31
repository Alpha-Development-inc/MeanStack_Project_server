const { validationResult } = require('express-validator');

let Message = require('../models/Message');

exports.getAllMessages = async (req, res) => {
    try {
        const messages = await Message.find();
        res.send(messages);
    } catch (err) {
        res.status(500).send('Server Error');
    }
};

exports.createMessage = async (req, res) => {
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            res.status(422).json({errors: errors.array()});
        }

        const newMessage = new Message({
            name: req.body.name,
            email: req.body.email,
            message: req.body.message,
            user: req.user.id
        });
        const result = await newMessage.save();
        res.send(result);
    }catch (err){
        res.status(500).send('Something is wrong with posting');
    }
};

