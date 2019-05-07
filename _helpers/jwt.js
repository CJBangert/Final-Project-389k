const expressJwt = require('express-jwt');
const config = require('config.json');
const userService = require('../users/user.service');
 
module.exports = jwt;

function jwt() {
    const secret = config.secret;
    console.log("here")
    return expressJwt({ secret, isRevoked }).unless({
        path: [
            // public routes that don't require authentication
            '/users/authenticate',
            '/register',
            '/views/authenticate',
            '/views/layouts/main',
            '/authenticate',
            '/',
            '/artist',
            '/allUsers',
            '/concerts',
            '/descriptions',
            '/location'
        ]
    });
}

async function isRevoked(req, payload, done) {
    const user = await userService.getById(payload.sub);

    // revoke token if user no longer exists
    if (!user) {
        console.log("Forbidden")
        return done(null, true);
    }

    done();
};