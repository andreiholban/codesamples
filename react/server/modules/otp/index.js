let otplib = require('otplib');
let config = require('../../config');

otplib.authenticator.options = {
    step: config.OTPValidTime
};

module.exports.generateOTP = (length) => {

    otplib.authenticator.options = {
        digits: config.OTPLength
    };

    if (length) {
        otplib.authenticator.options = {
            digits: length
        };
    }
    const secret = otplib.authenticator.generateSecret();
    const token = otplib.authenticator.generate(secret);
    return {
        token: token,
        secret: secret
    };
};

module.exports.validateOTP = (otp, secret) => {
    const isValid = otplib.authenticator.check(otp, secret);
    return isValid;
};