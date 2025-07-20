const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// const blackListTokenModel = require('../models/blacklistToken.model');


module.exports.authUser = async (req, res, next) => {
    const token =req.cookies.token || req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'No token provided, authorization denied' });
    }

    // const isBlacklisted = await blackListTokenModel.findOne({ token:token });
    const isBlacklisted = await userModel.findOne({ token:token });
    if(isBlacklisted){
        return res.status(401).json({ message: 'Token is blacklisted, authorization denied' });
    }
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await userModel.findById(decoded._id);
        if (!req.user) {
            return res.status(404).json({ message: 'User not found' });
        }
        next();

    }
    catch(error){
        return res.status(401).json({ message: 'Token is not valid' });
    }
}