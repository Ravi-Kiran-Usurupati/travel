const userModel=require('../models/user.model');
const userServices=require('../services/user.services');
const { validationResult}=require('express-validator');
const blackListTokenModel = require('../models/blacklistToken.model');

module.exports.registerUser = async (req, res,next) => {

    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()}); 
    }

    const {fullName, email, password} = req.body;
    const isUserExists = await userModel.findOne({ email: email });
    if (isUserExists) {
        return res.status(400).json({ message: 'User with this email already exists' });
    }

    const hashedPassword = await userModel.hashPassword(password);
    

    const user= await userServices.createUser({
        firstname: fullName.firstName,
        lastname: fullName.lastName,
        email: email,
        password: hashedPassword
    })
    
    const token = user.generateAuthToken();
    await user.save();
    

    res.status(201).json({ token,user});

}

module.exports.loginUser = async (req,res,next)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});

    }
    const {email, password} = req.body;
    

    const user= await userModel.findOne({ email:req.body.email}).select('+password');
    if(!user){
        return res.status(401).json({message: 'Invalid email or password'});
    }

    const isMatch=await user.comparePassword(password);
    if(!isMatch){
        return res.status(401).json({message: 'Invalid email or password'});
    }

    const token = user.generateAuthToken();
    res.cookie('token', token);

   

    res.status(200).json({ token,user})


}

module.exports.getUserProfile=async(req,res,next)=>{
  res.status(200).json(req.user)
}

module.exports.logoutUser=async(req,res,next)=>{
    res.clearCookie('token');
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    await blackListTokenModel.create({ token });
    res.status(200).json({message: 'Logged out successfully'});
    
}