const config = require('../config');

const apiKeyMiddleware = (req, res, next) => {
    const apiKey = req.headers['x-api-key'];

    // Replace 'your_api_key' with the actual API key
    if (apiKey && apiKey === config.X_API_KEY) {
        next();
    } else {
        res.status(401).json({error: 'Unauthorized. Invalid API key.'});
    }
};

module.exports = apiKeyMiddleware;