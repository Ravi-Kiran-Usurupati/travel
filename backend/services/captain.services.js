const captainModel = require('../models/captain.model');

module.exports.cretaeCaptain = async ({ fullName, email, password, vehicle }) => {
    if (!fullName || !email || !password || !vehicle) {
        throw new Error('All fields are required');
    }

    const captain = new captainModel({
        fullName: {
            firstName: fullName.firstName,
            lastName: fullName.lastName
        },
        email: email,
        password: password,
        vehicle: {
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

    return captain;
}