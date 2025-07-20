const captainModel = require('../models/captain.model');
const captainService = require('../services/captain.services');
const {validationResult} = require('express-validator');
const blackListTokenModel = require('../models/blacklistToken.model');


module.exports.registerCaptain = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { fullName, email, password, vehicle } = req.body;

    const iscaptainExists = await captainModel.findOne({ email: email });
    if (iscaptainExists) {
        return res.status(400).json({ message: 'Captain with this email already exists' });
    }

    const hashedPassword = await captainModel.hashPassword(password);

    const captain = await captainService.cretaeCaptain({
        fullName: {
            firstName: fullName.firstName,
            lastName: fullName.lastName
        },
        email: email,
        password: hashedPassword,
        vehicle:{
            color: vehicle.color,
            plate: vehicle.plate,
            capacity: vehicle.capacity,
            vehicleType: vehicle.vehicleType,
            location: {
                lat: vehicle.location.lat,
                lng: vehicle.location.lng
            }
        }
    });
    

    const token = captain.generateAuthToken();
    await captain.save();

    res.status(201).json({ token, captain });
}

module.exports.loginCaptain = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    console.log(req.body)

    const captain = await captainModel.findOne({ email: email }).select('+password');
    if (!captain) {
        return res.status(400).json({ message: 'Invalid email or password' });
    }

    const isMatch = await captain.comparePassword(password);
    if (!isMatch) {
        return res.status(400).json({ message: 'Invalid email or password' });
    }

    const token = captain.generateAuthToken();
    res.cookie('token', token);
    
    res.status(200).json({ token, captain });
}

module.exports.getCaptainProfile = async (req, res, next) => {
    res.status(200).json({ captain: req.captain });
}

module.exports.logoutCaptain = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    
    await blackListTokenModel.create({ token: token });

    res.clearCookie('token');
    res.status(200).json({ message: 'Logged out successfully' });
}