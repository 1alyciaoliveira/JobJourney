const { Schema, model } = require('mongoose');

const jobApplication = new Schema(
    {
        dateApplied: {
            type: String,
        },
        company: {
            type: String,
            // required: true,
        },
        jobPosition: {
            type: String,
            // required: true,
        },
        salary: {
            type: String,
        },
        url: {
            type: String,
            // required: true,
        },
        interview: {
            type: Boolean,
        },
        interviewDate: {
            type: Date,
        },
        comments: {
            type: String,
        },
        status: {
            type: String,
        },
        reminder: {
            type: Boolean,
        },
        reminderDate: {
            type: String,
        },
        userID: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    }
);

const Jobs = model('Jobs', jobApplication);

module.exports = Jobs;