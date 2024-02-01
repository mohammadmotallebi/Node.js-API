const config = require('../config');
const UserModel = require("../models/userModel");

const roleMiddleware = (roles = []) => { // role middleware function
    return async (req, res, next) => { // return async middleware function
        const user_id = req.cookies.session; // get user id from request cookies
        const user = await UserModel.findById(user_id); // find user by id
        if (roles.includes(user.role) || roles.includes('*')) { // check if user role is in roles array or roles array contains '*'
            next(); // call next middleware function
        } else {
            res.status(401).json({error: 'You do not have permission to access this page.'}); // return error if user role is not in roles array
        }
    }
}

module.exports = roleMiddleware;