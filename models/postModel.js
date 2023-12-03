const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        min: 3,
        max: 50
    },
    content: {
        type: String,
        required: true,
        min: 3,
        max: 50
    },
    tags: {
        type: Array,
        required: true,
    },
    images: {
        type: Array,
        required: false
    },
    deleted: {
        type: Boolean,
        default: false
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
},{
    timestamps: true,
    }
)

const PostModel = mongoose.model('Post', postSchema);

module.exports = PostModel;