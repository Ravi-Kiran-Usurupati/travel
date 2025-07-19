const userModel=require('../models/user.model');
const userServices=require('../services/user.services');
const { validationResult}=require('express-validator');

module.exports.registerUser = async (req, res,next) => {

    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()}); 
    }

    const {fullName, email, password} = req.body;
    console.log(req.body)

    const hashedPassword = await userModel.hashPassword(password);
    

    const user= await userServices.createUser({
        firstname: fullName.firstName,
        lastname: fullName.lastName,
        email: email,
        password: hashedPassword
    })
    
    const token = user.generateAuthToken();

    res.status(201).json({ token,user});

}