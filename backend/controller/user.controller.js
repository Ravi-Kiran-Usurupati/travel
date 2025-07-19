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
    await user.save();

    res.status(201).json({ token,user});

}

module.exports.loginUser = async (req,res,next)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});

    }
    const {email, password} = req.body;
    console.log(req.body)

    const user= await userModel.findOne({ email:req.body.email}).select('+password');
    if(!user){
        return res.status(401).json({message: 'Invalid email or password'});
    }

    const isMatch=await user.comparePassword(password);
    if(!isMatch){
        return res.status(401).json({message: 'Invalid email or password'});
    }

    const token = user.generateAuthToken();


    res.status(200).json({ token,user})


}