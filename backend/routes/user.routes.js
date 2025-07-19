const express = require('express');
const router = express.Router();
const {body}=require('express-validator')
const userController=require('../controller/user.controller');
router.post('/register',[
    body('email').isEmail().withMessage('Please enter a valid email address'),
    body('fullName.firstName').notEmpty().withMessage('First name is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
]
,userController.registerUser);







module.exports = router;