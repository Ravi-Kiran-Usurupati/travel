const userModel=require('../models/user.model')

module.exports.createUser=async({firstname,lastname,email,password})=>{
 
    if(!firstname||!email||!password){
        throw new Error('All fields are required');
    }
    const user=userModel({
        fullName: {
            firstName: firstname,
            lastName: lastname
        },
        email: email,
        password: password
    })

    return user;
}