const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    body: {
        type: String,
        required: false
    },
    completion: {
        type: Boolean,
        default: false
    },
    isvalid: {
        type: Boolean,
        default: true
    },
    category: {
        type: String,
        enum: ['Working', 'Learning', "Chores", "Self Care", "Excerise"],
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Task', TaskSchema)