const express = require('express');
const {check} = require('express-validator');
const router = express.Router();
const AuthController = require('../../controllers/auth');


router.post('/signup', 
    [
        check('username', 'Username is required').not().isEmpty(),
        check('email', 'E-mail is required').not().isEmpty(),
        check('email', 'Please enter valid email').isEmail(),
        check('password', 'Password have to be more than 8 symbols').isLength({min: 8})
    ],
    AuthController.signup    
);

router.post('/login',
    [
        check('email', 'E-mail is required').not().isEmpty(),
        check('password', 'Password is required').exists()
    ],
    AuthController.login
)

module.exports = router;