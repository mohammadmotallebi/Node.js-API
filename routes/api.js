const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const apiKeyMiddleware = require('../middlewares/apiKeyMiddleware');

router.get('/users', apiKeyMiddleware,userController.getAllUsers);

module.exports = router;