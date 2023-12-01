const pool = require('../dbConfig');

class UserModel {
    getAllUsers(callback) {
        pool.query('SELECT * FROM users', (error, results) => {
            if (error) {
                return callback(error);
            }
            return callback(null, results);
        });
    }
}

module.exports = new UserModel();