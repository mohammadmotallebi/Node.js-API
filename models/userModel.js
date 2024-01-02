const mongoose = require('../dbConfig');

const userSchema = new mongoose.Schema({
        name: {
            type: String,
            required: true,
            min: 3,
            max: 50
        },
        email: {
            type: String,
            unique: true,
            required: true,
            min: 3,
            max: 50
        },
        password: {
            type: String,
            required: true,
            min: 6,
            max: 50
        },
        role: {
            type: String,
            enum: ['admin', 'user'],
            default: 'user'
        },
        deleted: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: false,
        toJSON: {
            virtuals: true, transform: function (doc, ret) {
                delete ret.password;
                return ret;
            }
        },
        toObject: {
            virtuals: true, transform: function (doc, ret) {
                delete ret.password;
                return ret;
            }
        }
    }
);

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;