let jwt = require('jsonwebtoken');
let passport = require("passport");
let passportJWT = require("passport-jwt");

let config = require('../../config');
let userCollection = require('../../models/user');


module.exports.initializePassport = () => {
    let ExtractJwt = passportJWT.ExtractJwt;
    let JwtStrategy = passportJWT.Strategy;
    let jwtOptions = {};
    jwtOptions.jwtFromRequest = ExtractJwt.fromBodyField('token');
    jwtOptions.secretOrKey = config.passportSecret;
    let strategy = new JwtStrategy(jwtOptions, (jwt_payload, next) => {
        console.log('payload received', jwt_payload);
        // usually this would be a database call:
        userCollection.findOne({ _id: jwt_payload._id }, (findError, findData) => {
            console.log("token validates")
            if (findError) {
                next(null, false);
            }
            if (!findData) {
                next(null, false);
            }
            if (findData) {
                next(null, findData);
            } else {
                next(null, false);
            }
        });
    });
    passport.use(strategy);
};


module.exports.generateToken = (user) => {
    var payload = { _id: user._id };
    var token = jwt.sign(payload, config.passportSecret);
    return token;
};

module.exports.validateSession = passport.authenticate('jwt', { session: false });
