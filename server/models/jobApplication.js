const { Schema } = require('mongoose');

const jobApplication = new Schema(
    {
        // creator: {
        //     type: String,
        // },
        dateApplied: {
            type: Date,
            default: Date.now,
        },
        company: {
            type: String,
            required: true,
        },
        positionName: {
            type: String,
            required: true,
        },
        salary: {
            type: Number,
        },
        url: {
            type: String,
            required: true,
        },
        interview: {
            type: Boolean,
        },
        interviewDate: {
            type: Date,
        },
        industry: {
            type: String,
        },
        comments: {
            type: String,
        },
        status: {
            type: String,
        },
        reminder: {
            type: String,
        }
    }
);

module.exports = jobApplication;