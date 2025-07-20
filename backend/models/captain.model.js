const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const captainSchema = new mongoose.Schema({

    fullName:{
        firstName:{
            type: String,
            required: true,
            minlength:[1,"Enter a your first name"],
        },
        lastName:{
            type: String,
            required: false,
            minlength:[1,"Enter a your last name"],
        }
    },
    email:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        match:[/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Please enter a valid email address'],
    },
    password:{
        type: String,
        required: true,
        select: false,
    },
    socketId:{
        type: String,
    },
    status:{
        type: String,
        enum: ['active', 'inactive'],
        default: 'inactive',
    },
    vehicle:{
        color:{
            type: String,
            required: true,
            minlength:[1,"Enter the vehicle color"],
        },
        plate:{
            type: String,
            required: true,
            unique: true,
            minlength:[6, 'Please enter a valid vehicle plate number'],

        },
        capacity:{
            type: Number,
            required: true,
            min: [1, 'Vehicle capacity must be at least 1'],
            max: [100, 'Vehicle capacity cannot exceed 100'],
        },
        vehicleType:{
            type: String,
            required: true,
            enum: ['car', 'auto', 'motorcycle'],
        },
        location:{
            lat:{
                type: Number,
                
            },
            lng:{
                type: Number,
                
            }
        }
    }
})

captainSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
        expiresIn: '24h'
    });
    return token;
}

captainSchema.methods.comparePassword = async function(password) {
    const isMatch = await bcrypt.compare(password, this.password);
    return isMatch;
}

captainSchema.statics.hashPassword = async function(password) {
    return await bcrypt.hash(password, 10);
}


const captainModel = mongoose.model('captain', captainSchema);

module.exports = captainModel;