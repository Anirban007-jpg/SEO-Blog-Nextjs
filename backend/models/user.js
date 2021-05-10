const mongoose = require('mongoose');
const crypto = require('crypto');


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        trim: true,
        unique: true,
        index: true,
        lowerCase: true
    },
    name: {
        type: String,
    },
    about: {
        type: String
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true,
    },
    profile: {
        type: String,
        required: true
    },
    hashed_password: {
        type: String,
        required: true
    },
    salt: String,
    photo: {
        data: Buffer,
        contentType: String
    },
    role: {
        type: Number,
        trim: true
    },
    resetPasswordLink: {
        data: String,
        default: ""
    },
    address: {
        type: String
    },
    mobile_no: {
        type: String
    }
}, {timestamp: true})

module.exports = mongoose.model('User', userSchema);