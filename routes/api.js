const express = require('express');
const guestRouter = express.Router();
const userRouter = express.Router();
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const apiKeyMiddleware = require('../middlewares/apiKeyMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');

guestRouter.use(apiKeyMiddleware);
guestRouter.post('/register', authController.register);
guestRouter.post('/login', authController.login);

userRouter.use(apiKeyMiddleware).use(authMiddleware);
userRouter.get('/users', userController.getAllUsers);
userRouter.get('/users/:id', userController.getUserById);
userRouter.get('/me', userController.currentUser);
userRouter.post('/logout', authController.logout);

module.exports = {
    guest: guestRouter,
    user: userRouter
}