const UserModel = require('../models/userModel');

class UserController {
    getAllUsers(req, res) {
        UserModel.getAllUsers((error, results) => {
            if (error) {
                return res.status(500).json({ error: error});
            }
            return res.status(200).json(results);
        });
    }
}

module.exports = new UserController();