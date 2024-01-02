const express = require('express');
const guestRouter = express.Router();
const userRouter = express.Router();
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const apiKeyMiddleware = require('../middlewares/apiKeyMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');
const postController = require('../controllers/postController');
const mdxController = require('../controllers/mdxController');
const jobController = require('../controllers/jobController');


guestRouter.use(apiKeyMiddleware);
guestRouter.post('/register', authController.register);
guestRouter.post('/login', authController.login);
guestRouter.post('/read-mdx', mdxController.readMdx);

userRouter.use(apiKeyMiddleware).use(authMiddleware);
userRouter.post('/auth', authController.checkAuth);
userRouter.post('/users', roleMiddleware(['*']), userController.getAllUsers)
userRouter.get('/user/:id', roleMiddleware(['*']), userController.getUserById);
userRouter.post('/user/create', roleMiddleware(['admin']), userController.userCreate);
userRouter.get('/me', roleMiddleware(['*']), userController.currentUser);
userRouter.post('/logout', roleMiddleware(['*']), authController.logout);
userRouter.put('/update-me', roleMiddleware(['*']), userController.updateUser);
userRouter.put('/update-my-password', roleMiddleware(['*']), userController.updatePassword);
userRouter.put('/user/:id/role-update', roleMiddleware(['*']), userController.updateRole);
userRouter.delete('/user/:id/delete', roleMiddleware(['*']), userController.deleteUser);
userRouter.put('/user/update', roleMiddleware(['admin']), userController.updateAllUserInformation);
userRouter.put('/user/update-password', roleMiddleware(['admin']), userController.updatePassword);
userRouter.put('/user/:id/restore', roleMiddleware(['admin']), userController.restoreUser);
userRouter.post('/roles', roleMiddleware(['*']), userController.getAllRoles);
// Post routes
userRouter.post('/posts', roleMiddleware(['*']), postController.getAllPosts);
userRouter.get('/post/:id', roleMiddleware(['*']), postController.getPostById);
userRouter.post('/post/create', roleMiddleware(['admin', 'author', 'super-admin']), postController.createPost);
userRouter.put('/post/update', roleMiddleware(['admin', 'author', 'super-admin']), postController.updatePost);
userRouter.delete('/post/:id/delete', roleMiddleware(['admin', 'super-admin']), postController.deletePost);
userRouter.put('/post/:id/restore', roleMiddleware(['admin', 'super-admin']), postController.restorePost);
// Tag routes
userRouter.post('/tags', roleMiddleware(['*']), postController.getAllTags);

// MDX routes
userRouter.post('/save-mdx', roleMiddleware(['*']), mdxController.saveMdx);
userRouter.get('/list-mdx', roleMiddleware(['*']), mdxController.getMdxList);

// Job routes
userRouter.post('/jobs', roleMiddleware(['*']), jobController.getAllJobs);
userRouter.get('/job/:id', roleMiddleware(['*']), jobController.getJobById);
userRouter.post('/job/create', roleMiddleware(['admin', 'super-admin']), jobController.createJob);
// userRouter.put('/job/update', roleMiddleware(['admin','super-admin']), jobController.updateJob);
userRouter.delete('/job/:id/delete', roleMiddleware(['admin', 'super-admin']), jobController.deleteJob);
userRouter.put('/job/:id/restore', roleMiddleware(['admin', 'super-admin']), jobController.restoreJob);
userRouter.post('/job/upload-image', roleMiddleware(['admin', 'super-admin']), jobController.uploadImage);

module.exports = {
    guest: guestRouter,
    user: userRouter
}