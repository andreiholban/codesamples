let config = require('../../config');
let user = require('./user');
let userModel = require('../../models/user');
let otp = require('../otp');
let mail = require('../mail');
let mailTemplates = require('../emailTemplates');


module.exports.signup = (req, res) => {

    let User;
    let otpEmail = otp.generateOTP(7);

    try {
        User = new user(
            req.body.name,
            req.body.email.toLowerCase(),
            req.body.password,
            config.userTypes.registered_User,
            otpEmail.token,
            otpEmail.secret
        );

        let userCollection = new userModel(User);
        userCollection.save((saveError, saveData) => {
            if (saveError) {

                if (saveError.errors) {
                    res.statusCode = config.errorCodes.error;
                    res.send({
                        success: false,
                        error: Object.keys(saveError.errors).join(',') + ' already registered',
                        errorDescription: saveError
                    });
                    return;
                }
                res.statusCode = config.errorCodes.internalServerError;
                res.send({
                    success: false,
                    error: 'Internal Server Error',
                    errorDescription: saveError
                });
                return
            }

            mail.sendEmail(
                config.emailSubjects.signUpEmail,
                mailTemplates.signUpEmail(otpEmail, saveData._id),
                config.fromMail[0],
                req.body.email,
                'text/html'
            );


            res.send({
                success: true,
                data: saveData._id
            })

        });

    } catch (e) {

        res.statusCode = config.errorCodes.error;
        res.send({
            success: false,
            error: e.message
        });
    }


};