const config = require('../config');
const {verify} = require("jsonwebtoken");


const authMiddleware = (req, res, next) => { // authentication middleware function
    const token = req.cookies.token; // get token from request cookies

    if (token) {
        verify(token, config.SECRET_KEY, (err, decoded) => { // verify token with jwt
            if (err) {
                return res.status(401).json({error: err}); // return error if token is invalid
            }
            req.decoded = decoded; // set decoded token in request
            next(); // call next middleware function
        });
    } else {
        res.status(401).json({error: 'Unauthorized. Token not found.'}); // return error if token is not found
    }
}

module.exports = authMiddleware;