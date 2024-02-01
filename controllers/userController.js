const UserModel = require('../models/userModel');
const bcrypt = require("bcrypt");

class UserController {
    async getAllUsers(req, res) { // get all users
        const filter = req.body; // get filter from request body
        try {
            const users = await UserModel.find(filter).and([{deleted: false}]) // find all users with filter
            res.status(200).json(users); // return users in response
        } catch (error) {
            res.status(500).json({error: error}); // return error in response if any
        }
    }

    async getUserById(req, res) { // get user by id
        try {
            const user = await UserModel.findById(req.params.id); // find user by id
            res.status(200).json(user); // return user in response
        } catch (error) {
            res.status(500).json({error: error}); // return error in response if any
        }
    }

    async currentUser(req, res) { // get current user
        const user_id = req.cookies.session;
        const user = await UserModel.findById(user_id); // find user by id
        res.status(200).json({user: user}); // return user in response
    }


    // Update user's password
    async updatePassword(req, res) { // update user password
        try {
            const hashedPassword = await bcrypt.hash(req.body.password, 10); // hash user password with bcrypt
            await UserModel.findByIdAndUpdate(req.body._id, {password: hashedPassword}); // update user password
            res.status(200).json({message: 'Password updated successfully!'}); // return success message
        } catch (error) {
            res.status(500).json({error: error}); // return error in response if any
        }
    }

    async userCreate(req, res) {  // create new user
        try {
            const {name, email, password, role} = req.body; // get user data from request body
            const hashedPassword = await bcrypt.hash(password, 10); // hash user password with bcrypt
            const user = await UserModel.create({name: name, email: email, password: hashedPassword, role: role}); // create new user in database
            res.status(200).json(user); // return user data in response
        } catch (error) {
            res.status(500).json({error: error});   // return error in response if any
        }
    }

    // Update user's role
    async updateRole(req, res) { // update user role
        try {
            const {role} = req.body; // get user role from request body
            await UserModel.findByIdAndUpdate(req.params.id, {role: role}); // update user role
            res.status(200).json({message: 'Role updated successfully!'}); // return success message
        } catch (error) {
            res.status(500).json({error: error}); // return error in response if any
        }
    }

    // Update user's name and email
    async updateUser(req, res) { // update user
        try {
            const {name, email} = req.body; // get user name and email from request body
            await UserModel.findByIdAndUpdate(req.body._id, {name: name, email: email}); // update user name and email
            res.status(200).json({message: 'User updated successfully!'}); // return success message
        } catch (error) {
            res.status(500).json({error: error}); // return error in response if any
        }
    }

    // Soft Delete user (set deleted to true)
    async deleteUser(req, res) { // delete user
        try {
            const user = await UserModel.findByIdAndUpdate(req.params.id, {deleted: true}); // set user deleted status to true
            const deletedUser = await UserModel.findById(user._id); // find user by id
            res.status(200).json(deletedUser); // return deleted user in response
        } catch (error) {
            res.status(500).json({error: error}); // return error in response if any
        }
    }

    async updateAllUserInformation(req, res) { // update user
        try {
            const {name, email, role} = req.body; // get user name and email from request body
            // const hashedPassword = await bcrypt.hash(password, 10);
            await UserModel.findByIdAndUpdate(req.body._id, {name: name, email: email, role: role}); // update user name and email
            res.status(200).json({message: 'User updated successfully!'}); // return success message
        } catch (error) {
            res.status(500).json({error: error}); // return error in response if any
        }
    }

    async restoreUser(req, res) { // restore user
        try {
            await UserModel.findByIdAndUpdate(req.params.id, {deleted: false}); // set user deleted status to false
            res.status(200).json({message: 'User restored successfully!'}); // return restored user in response
        } catch (error) {
            res.status(500).json({error: error}); // return error in response if any
        }
    }

    async getAllRoles(req, res) {
        try {
            const roles = await UserModel.schema.path('role').enumValues; // get all roles from user schema
            res.status(200).json(roles);    // return roles in response
        } catch (error) {
            res.status(500).json({error: error}); // return error in response if any
        }
    }
}

module.exports = new UserController();