const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

// Import Schema from JobApplication.js
const jobApplication = require('./jobApplication');

const userSchema = new Schema(
    {
    username: {
        type:String,
        required: true,
        unique: true,
        maxlength: 50,
    },

    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/, 'Must use a valid email address'],
    },

    password: {
        type: String,
        required: true,
    },

    jobApplied: [jobApplication],
})

const User = model('User', userSchema);

module.exports = User