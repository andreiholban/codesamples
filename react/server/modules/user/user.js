let stringUtils = require('../utils/stringUtils');
let config = require('../../config');
let dateUtils = require('../utils/dateUtils');
let passwordUtils = require('../utils/passwordUtils');
let shortId = require('short-id');

class User {
    constructor(name, email, password, type, otpEmail, OTP_EmailSecret) {
        this.name = "";
        this.email = "";
        this.type = config.userTypes.registered_User;
        this.createdDateISO = new Date();
        this.createdDate = dateUtils.getUTCTimeStamp();
        this.updatedDateISO = new Date();
        this.updatedDate = dateUtils.getUTCTimeStamp();
        this.emailVerified = false;
        this.OTP_Email = '';
        this.OTP_EmailSecret = OTP_EmailSecret;
        this.disabled = false;
        this.password = '';
        this.id = shortId.generate();

        this.setName(name);
        this.setEmail(email);
        this.setType(type);
        this.setPassword(password);
        this.setOTP_Email(otpEmail);
    }

    setName(name) {
        if (!name) {
            throw new Error('Invalid Name');
        }
        this.name = name;
        return this.name;
    }

    setEmail(email) {
        if (!stringUtils.validateEmail(email)) {
            throw new Error('Invalid Email');
        }
        this.email = email;
        return this.email;
    }

    setType(type) {
        if (!type) {
            return;
        }
        let isValid = false;
        for (var userType in config.userTypes) {
            if (config.userTypes[userType] == type) {
                isValid = true;
                break;
            }
        }
        if (isValid) {
            this.type = type;
        } else {
            throw new Error("Invalid User Type");
        }
    }

    setPassword(password) {
        if (!password) {
            throw new Error('Invalid Password');
        }
        let hashedPassword = passwordUtils.hashPassword(password);
        this.password = hashedPassword;
        return this.password;
    }

    setOTP_Email(otp) {
        if (!otp) {
            return
        }
        this.OTP_Email = otp;
    }
}

module.exports = User;