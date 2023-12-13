const express = require('express');
const guestRouter = express.Router();
const userRouter = express.Router();
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const apiKeyMiddleware = require('../middlewares/apiKeyMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');
const postController = require('../controllers/postController');
const path = require('path');
const {glob} = require('glob')
const fs = require('fs');

guestRouter.use(apiKeyMiddleware);
guestRouter.post('/register', authController.register);
guestRouter.post('/login', authController.login);

userRouter.use(apiKeyMiddleware).use(authMiddleware);
userRouter.post('/auth', authController.checkAuth);
userRouter.post('/users', roleMiddleware(['*']), userController.getAllUsers)
userRouter.get('/user/:id', roleMiddleware(['*']), userController.getUserById);
userRouter.post('/user/create', roleMiddleware(['admin']), userController.userCreate);
userRouter.get('/me',roleMiddleware(['*']), userController.currentUser);
userRouter.post('/logout',roleMiddleware(['*']), authController.logout);
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
userRouter.post('/post/create', roleMiddleware(['admin','author','super-admin']), postController.createPost);
userRouter.put('/post/update', roleMiddleware(['admin','author','super-admin']), postController.updatePost);
userRouter.delete('/post/:id/delete', roleMiddleware(['admin','super-admin']), postController.deletePost);
userRouter.put('/post/:id/restore', roleMiddleware(['admin','super-admin']), postController.restorePost);
// Tag routes
userRouter.post('/tags', roleMiddleware(['*']), postController.getAllTags);

userRouter.get('/read-mdx', async (req, resp) => {
    // get .md file list  from ../frontend/content
    //requiring path and fs modules


    let fileContents = [];
//joining path of directory
    const directoryPath = path.join(__dirname, '../frontend/content');

    const files = await glob(directoryPath + '/**/*.md');

    files.forEach(function (file) {
        // read file content
        const filePath = file;
        console.log(filePath)
        const fileContent = fs.readFileSync(filePath,  { encoding: 'utf8' });
        fileContents.push(fileContent);
    }
    );
    return resp.json({fileContents: fileContents});


        // console.log(files)
        // files.forEach(function (file) {
        //     // read file content
        //     const filePath = file;
        //     console.log(filePath)
        //     // const fileContent = fs.readFileSync(filePath,  { encoding: 'utf8' });
        //     // fileContents.push(fileContent);
        //
        // });
        // return resp.json({fileContents: fileContents});
});

module.exports = {
    guest: guestRouter,
    user: userRouter
}