const UserModel = require('../models/userModel');

class UserController {
    async getAllUsers(req, res) {
        try {
            const users = await UserModel.find();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ error: error });
        }
    }
}

module.exports = new UserController();