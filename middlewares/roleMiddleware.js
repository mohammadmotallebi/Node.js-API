const config = require('../config');
const UserModel = require("../models/userModel");

const roleMiddleware = (roles=[]) => {
    return async (req, res, next) => {
    const user_id = req.cookies.session;
    const user = await UserModel.findById(user_id);
    if (roles.includes(user.role) || roles.includes('*')) {
        next();
    } else {
        res.status(401).json({error: 'You do not have permission to access this page.'});
    }
}
}

module.exports = roleMiddleware;