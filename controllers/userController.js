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

    async getUserById(req, res) {
        try {
            const user = await UserModel.findById(req.params.id);
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ error: error });
        }
    }

    async currentUser(req, res) {
        const user_id = req.cookies.session;
        const user = await UserModel.findById(user_id);
        res.status(200).json({ user: user });
    }
}

module.exports = new UserController();