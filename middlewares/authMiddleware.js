const config = require('../config');
const {verify} = require("jsonwebtoken");


const authMiddleware = (req, res, next) => {
    const token = req.cookies.token;

    if (token) {
        verify(token, config.SECRET_KEY, (err, decoded) => {
            if (err) {
                return res.status(401).json({ error: err });
            }
            req.decoded = decoded;
            next();
        });
    } else {
        res.status(401).json({ error: 'Unauthorized. Token not found.' });
    }
}

module.exports = authMiddleware;