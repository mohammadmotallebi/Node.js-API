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
                return res.status(401).json({ error: 'Incorrect Credentials!' });
            }
            const isPasswordCorrect = await bcrypt.compare(password, user.password);
            if (!isPasswordCorrect) {
                return res.status(401).json({ error: 'Incorrect Credentials!' });
            }
            const token = jwt.sign({ id: user._id }, config.SECRET_KEY, { algorithm: 'HS256', expiresIn: '1h' });
            res.cookie('token', token, {
                httpOnly: true
            });
            res.cookie('session', user._id, {
                httpOnly: true,
                secure: true,
            });
            res.status(200).json({ token: token });
        } catch (error) {
            res.status(500).json({ error: error });
        }
    }

    async logout(req, res) {
        try {
            res.clearCookie('token');
            res.clearCookie('session');
            res.status(200).json({ message: 'Logout success!' });
        } catch (error) {
            res.status(500).json({ error: error });
        }
    }




}

module.exports = new AuthController();
