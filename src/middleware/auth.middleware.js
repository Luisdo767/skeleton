const { getUserById } = require('../users/users.controllers');

const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;

module.exports = (passport) => {
    const opts = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('JWT'),
        secretOrKey: "academlo",
    };
    passport.use(
        new JwtStrategy(opts, (decoded, done) => {

            const data = getUserById(decoded.id)
            if(data){
                console.log('Decoded jwt:', decoded)
                return done(null, decoded)
            } else {
                return done( null, false)
            }
            
        })
    )
}


