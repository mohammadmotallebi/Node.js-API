const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const UserModel = require('../models/userModel');
const config = require('../config');

class AuthController {

    // Register new user
    async register(req, res) {
        try {
            const {name, email, password, role} = req.body;
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = await UserModel.create({name, email, password: hashedPassword, role, deleted: false});
            res.status(201).json({user: user});
        } catch (error) {
            res.status(500).json({error: error});
        }
    }

    // Login user
    async login(req, res) {
        try {
            const {email, password, remember} = req.body;
            console.log(email)
            console.log(password)
            const user = await UserModel.findOne({email: email, deleted: false});
            console.log(user)
            if (!user) {
                return res.status(401).json({error: 'Incorrect Credentials!'});
            }
            const isPasswordCorrect = await bcrypt.compare(password, user.password);
            if (!isPasswordCorrect) {
                return res.status(401).json({error: 'Incorrect Credentials!'});
            }
            const token = jwt.sign({id: user._id}, config.SECRET_KEY, {
                algorithm: 'HS256',
                expiresIn: remember ? '60d' : '7d'
            });
            res.cookie('token', token, {
                httpOnly: true
            });
            res.cookie('session', user._id, {
                httpOnly: true,
                secure: true,
            });
            res.status(200).json({logged_in: true});
        } catch (error) {
            console.log(error)
            res.status(500).json({error: error});
        }
    }

    async checkAuth(req, res) {
        try {
            const token = req.cookies.token;
            if (token) {
                jwt.verify(token, config.SECRET_KEY, (err, decoded) => {
                    if (err) {
                        return res.status(401).json({error: err});
                    }
                    req.decoded = decoded;
                    res.status(200).json({
                        logged_in: true,
                        user: decoded.id
                    });
                });
            } else {
                res.status(401).json({error: 'Unauthorized. Token not found.'});
            }
        } catch (error) {
            res.status(500).json({error: error});
        }
    }

    // Logout user
    async logout(req, res) {
        try {
            res.clearCookie('token');
            res.clearCookie('session');
            res.status(200).json({message: 'Logout success!'});
        } catch (error) {
            res.status(500).json({error: error});
        }
    }

}

module.exports = new AuthController();
