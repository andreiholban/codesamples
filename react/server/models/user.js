let mongoose = require('mongoose');
let config = require('../config');
let uniqueValidator = require('mongoose-unique-validator');


let userSchema = mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: false,
        unique: false
    },
    address: {
        type: String,
        required: false,
        unique: false
    },
    password: {
        type: String,
        required: false
    },
    emailVerified: Boolean,
    OTP_Email: Number,
    OTP_EmailSecret: String,
    type: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        default: '',
        required: false
    },
    createdDateISO: {
        type: Date,
        required: true
    },
    createdDate: {
        type: String,
        timestamps: true
    },
    updatedDateISO: {
        type: Date,
        required: false
    },
    updatedDate: {
        type: String,
        timestamps: true,
        required: false
    },
    disabled: Boolean,
    resetPasswordOTP: {
        type: Number,
        default: ''
    },
    resetPasswordOTPSecret: {
        type: String,
        default: ''
    },
    isSocialLogin: {
        type: Boolean,
        default: false
    },
    socialLogin: {
        type: String,
        default: ''
    }

});


userSchema.plugin(uniqueValidator);
let user = mongoose.model(config.collections.userCollection, userSchema);

module.exports = user;