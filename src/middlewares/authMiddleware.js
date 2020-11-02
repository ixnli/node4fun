const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');
const config = require('../configs/index');

module.exports = () => {
    const issuer = config.get('auth:issuer');
    return jwt({
        secret: jwksRsa.expressJwtSecret({
            cache: true,
            rateLimit: true,
            jwksRequestsPerMinute: 5,
            jwksUri: `${issuer}/.well-known/jwks`
        }),
        audience: `${issuer}/resources`,
        issuer: issuer,
        algorithms: ['RS256'],
    });
};