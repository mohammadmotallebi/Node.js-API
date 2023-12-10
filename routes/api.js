const express = require('express');
const guestRouter = express.Router();
const userRouter = express.Router();
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const apiKeyMiddleware = require('../middlewares/apiKeyMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');
const postController = require('../controllers/postController');


guestRouter.use(apiKeyMiddleware);
guestRouter.post('/register', authController.register);
guestRouter.post('/login', authController.login);

userRouter.use(apiKeyMiddleware).use(authMiddleware);
userRouter.post('/auth', authController.checkAuth);
userRouter.post('/users', roleMiddleware(['*']), userController.getAllUsers)
userRouter.get('/user/:id', roleMiddleware(['*']), userController.getUserById);
userRouter.get('/me',roleMiddleware(['*']), userController.currentUser);
userRouter.post('/logout',roleMiddleware(['*']), authController.logout);
userRouter.put('/update-me', roleMiddleware(['*']), userController.updateUser);
userRouter.put('/update-my-password', roleMiddleware(['*']), userController.updatePassword);
userRouter.put('/user/:id/role-update', roleMiddleware(['*']), userController.updateRole);
userRouter.delete('/user/:id/delete', roleMiddleware(['*']), userController.deleteUser);
userRouter.put('/user/:id/update', roleMiddleware(['admin']), userController.updateAllUserInformation);
userRouter.put('/user/:id/restore', roleMiddleware(['admin']), userController.restoreUser);
// Post routes
userRouter.post('/posts', roleMiddleware(['*']), postController.getAllPosts);
userRouter.get('/post/:id', roleMiddleware(['*']), postController.getPostById);
userRouter.post('/post/create', roleMiddleware(['admin','author','super-admin']), postController.createPost);
userRouter.put('/post/update', roleMiddleware(['admin','author','super-admin']), postController.updatePost);
userRouter.delete('/post/:id/delete', roleMiddleware(['admin','super-admin']), postController.deletePost);
userRouter.put('/post/:id/restore', roleMiddleware(['admin','super-admin']), postController.restorePost);
// Tag routes
userRouter.post('/tags', roleMiddleware(['*']), postController.getAllTags);



module.exports = {
    guest: guestRouter,
    user: userRouter
}