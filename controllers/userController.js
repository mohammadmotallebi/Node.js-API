const UserModel = require('../models/userModel');
const bcrypt = require("bcrypt");

class UserController {
    async getAllUsers(req, res) {
        const filter = req.body;
        try {
            const users = await UserModel.find(filter).and([{deleted: false}])
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({error: error});
        }
    }

    async getUserById(req, res) {
        try {
            const user = await UserModel.findById(req.params.id);
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({error: error});
        }
    }

    async currentUser(req, res) {
        const user_id = req.cookies.session;
        const user = await UserModel.findById(user_id);
        res.status(200).json({user: user});
    }


    // Update user's password
    async updatePassword(req, res) {
        try {
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            await UserModel.findByIdAndUpdate(req.body._id, {password: hashedPassword});
            res.status(200).json({message: 'Password updated successfully!'});
        } catch (error) {
            res.status(500).json({error: error});
        }
    }

    async userCreate(req, res) {
        try {
            const {name, email, password, role} = req.body;
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = await UserModel.create({name: name, email: email, password: hashedPassword, role: role});
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({error: error});
        }
    }

    // Update user's role
    async updateRole(req, res) {
        try {
            const {role} = req.body;
            await UserModel.findByIdAndUpdate(req.params.id, {role: role});
            res.status(200).json({message: 'Role updated successfully!'});
        } catch (error) {
            res.status(500).json({error: error});
        }
    }

    // Update user's name and email
    async updateUser(req, res) {
        try {
            const {name, email} = req.body;
            await UserModel.findByIdAndUpdate(req.body._id, {name: name, email: email});
            res.status(200).json({message: 'User updated successfully!'});
        } catch (error) {
            res.status(500).json({error: error});
        }
    }

    // Soft Delete user (set deleted to true)
    async deleteUser(req, res) {
        try {
            const user = await UserModel.findByIdAndUpdate(req.params.id, {deleted: true});
            const deletedUser = await UserModel.findById(user._id);
            res.status(200).json(deletedUser);
        } catch (error) {
            res.status(500).json({error: error});
        }
    }

    async updateAllUserInformation(req, res) {
        try {
            const {name, email, role} = req.body;
            // const hashedPassword = await bcrypt.hash(password, 10);
            await UserModel.findByIdAndUpdate(req.body._id, {name: name, email: email, role: role});
            res.status(200).json({message: 'User updated successfully!'});
        } catch (error) {
            res.status(500).json({error: error});
        }
    }

    async restoreUser(req, res) {
        try {
            await UserModel.findByIdAndUpdate(req.params.id, {deleted: false});
            res.status(200).json({message: 'User restored successfully!'});
        } catch (error) {
            res.status(500).json({error: error});
        }
    }

    async getAllRoles(req, res) {
        try {
            const roles = await UserModel.schema.path('role').enumValues;
            res.status(200).json(roles);
        } catch (error) {
            res.status(500).json({error: error});
        }
    }
}

module.exports = new UserController();