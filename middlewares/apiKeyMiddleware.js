const config = require('../config');

const apiKeyMiddleware = (req, res, next) => { // api key middleware function
    const apiKey = req.headers['x-api-key']; // get api key from request headers

    // Replace 'your_api_key' with the actual API key
    if (apiKey && apiKey === config.X_API_KEY) { // check if api key is valid
        next(); // call next middleware function
    } else {
        res.status(401).json({error: 'Unauthorized. Invalid API key.'}); // return error if api key is invalid
    }
};

module.exports = apiKeyMiddleware;