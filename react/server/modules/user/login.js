let userCollection = require('../../models/user');
let passwordUtils = require('../utils/passwordUtils');
let config = require('../../config');
let authentication = require('../Authentication/Authenticate');


module.exports.login = (req, res) => {


    if (!req.body.email) {
        res.statusCode = config.errorCodes.error;
        res.send({
            success: false,
            error: 'Invalid email'
        });
        return;
    }


    if (!req.body.password) {
        res.statusCode = config.errorCodes.error;
        res.send({
            success: false,
            error: 'Invalid password'
        });
        return;
    }

    userCollection.findOne({ email: req.body.email.toLowerCase() }, (findError, findData) => {
        if (findError) {
            res.statusCode = config.errorCodes.internalServerError;
            res.send({
                success: false,
                error: 'Internal Server Error',
                errorDescription: findError
            });
            return;
        }

        if (!findData) {
            res.statusCode = config.errorCodes.error;
            res.send({
                success: false,
                error: 'Email not registered'
            });
            return;
        }

        let passwordCheck = passwordUtils.comparePassword(req.body.password, findData.password);
        if (!passwordCheck) {
            res.statusCode = config.errorCodes.error;
            res.send({
                success: false,
                error: 'Invalid Login'
            });
            return;
        }

        if (!findData.emailVerified) {
            res.statusCode = config.errorCodes.error;
            res.send({
                success: false,
                error: 'Email not verified'
            });
            return;
        }


        if (findData.disabled) {
            res.statusCode = config.errorCodes.error;
            res.send({
                success: false,
                error: 'User disabled'
            });
            return;
        }

        let token = authentication.generateToken(findData);

        res.send({
            success: true,
            token: token,
            userId: findData._id
        })

    })


};