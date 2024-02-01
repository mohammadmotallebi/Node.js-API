const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const UserModel = require('../models/userModel');
const config = require('../config');

class AuthController {

    // Register new user
    async register(req, res) {
        try {
            const {name, email, password, role} = req.body; // get user data from request body
            const hashedPassword = await bcrypt.hash(password, 10); // hash user password with bcrypt
            const user = await UserModel.create({name, email, password: hashedPassword, role, deleted: false}); // create new user in database
            res.status(201).json({user: user}); // return user data in response
        } catch (error) {
            res.status(500).json({error: error}); // return error in response if any
        }
    }

    // Login user
    async login(req, res) { // login user
        try {
            const {email, password, remember} = req.body; // get user data from request body
            console.log(email)
            console.log(password)
            const user = await UserModel.findOne({email: email, deleted: false}); // find user by email
            console.log(user)
            if (!user) {
                return res.status(401).json({error: 'Incorrect Credentials!'}); // return error if user not found
            }
            const isPasswordCorrect = await bcrypt.compare(password, user.password); // compare user password with hashed password
            if (!isPasswordCorrect) {
                return res.status(401).json({error: 'Incorrect Credentials!'}); // return error if password is incorrect
            }
            const token = jwt.sign({id: user._id}, config.SECRET_KEY, { // create jwt token
                algorithm: 'HS256', // algorithm to encode token
                expiresIn: remember ? '60d' : '7d' // token expiration time
            });
            res.cookie('token', token, { // set token in cookie for client
                httpOnly: true
            });
            res.cookie('session', user._id, { // set user id in cookie for client
                httpOnly: true,
                secure: true,
            });
            res.status(200).json({logged_in: true}); // return success message
        } catch (error) {
            console.log(error)
            res.status(500).json({error: error}); // return error in response if any
        }
    }

    async checkAuth(req, res) { // check user authentication status
        try {
            const token = req.cookies.token;
            if (token) {
                // verify token with jwt
                jwt.verify(token, config.SECRET_KEY, (err, decoded) => {
                    if (err) {
                        return res.status(401).json({error: err}); // return error if token is invalid
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
    async logout(req, res) { // logout user
        try {
            res.clearCookie('token'); // clear token cookie
            res.clearCookie('session'); // clear user id cookie
            res.status(200).json({message: 'Logout success!'}); // return success message
        } catch (error) {
            res.status(500).json({error: error}); // return error in response if any
        }
    }

}

module.exports = new AuthController();
