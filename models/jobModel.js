const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Job title is required.'],
        trim: true,
        maxlength: [100, 'Job title cannot exceed 100 characters.']
    },
    description: {
        type: String,
        required: [true, 'Job description is required.'],
        maxlength: [1000, 'Job description cannot exceed 1000 characters.']
    },
    services: {
        type: Array,
        required: [true, 'Job services are required.']
    },
    location: {
        type: Array,
        required: [true, 'Job location is required.']
    },
    address: {
        type: String,
        required: [true, 'Job address is required.']
    },
    company: {
        type: String,
        required: [true, 'Company name is required.']
    },
    website: {
        type: String,
        required: [true, 'Website is required.']
    },
    phone: {
        type: String,
        required: [true, 'Phone number is required.']
    },
    images: {
        type: Array,
    },
    user_id: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    deleted: {
        type: Boolean,
        default: false
    }
});

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;