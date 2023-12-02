const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const UserModel = require('../models/userModel');
const config = require('../config');
const {compare} = require("bcrypt");

class AuthController {
    async register(req, res) {
        try {
            const { name, email, password, role } = req.body;
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = await UserModel.create({ name, email, password: hashedPassword, role });
            res.status(201).json({ user: user });
        } catch (error) {
            res.status(500).json({ error: error });
        }
    }

    async login(req, res) {
        try {
            const { email, password } = req.body;
            const user = await UserModel.findOne({ email: email });
            if (!user) {
                return res.status(401).json({ error: 'User not found!' });
            }
            const isPasswordCorrect = await bcrypt.compare(password, user.password);
            if (!isPasswordCorrect) {
                return res.status(401).json({ error: 'Incorrect password!' });
            }
            const token = jwt.sign({ id: user._id }, config.SECRET_KEY, { algorithm: 'HS256', expiresIn: '1h' });
            res.status(200).json({ token: token });
        } catch (error) {
            res.status(500).json({ error: error });
        }
    }

}

module.exports = new AuthController();
