const { Schema, model } = require('mongoose');
// Install bcrypt dependency for this to work
const bcrypt = require('bcrypt');

// Import Schema from JobApplication.js
const jobApplication = require('./jobApplication');

// This is the main Schema for the DB. It holds the information from the user.
const userSchema = new Schema(
    {
    username: {
        type: String,
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

    jobsApplied: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Jobs'
        }
    ],
},
{
    toJSON: {
        virtuals: true,
    },
}
);

// Bcryp to hash user password
userSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }

next();
});

// custom method to compare and validate password for logging in
userSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

// when we query a user, we'll also get another field called `jobCount` with the number of job offers the user has applied to
userSchema.virtual('jobCount').get(function () {
    return this.jobsApplied.length;
});



const User = model('User', userSchema);

module.exports = User;