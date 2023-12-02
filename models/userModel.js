const mongoose = require('../dbConfig');

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    role: String,
    deleted: Boolean
});

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;