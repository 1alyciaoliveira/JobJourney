const { Schema } = require('mongoose');

const jobApplication = new Schema(
    {
        creator: {
            type: String,
        },
        dateApplied: {
            type: Date,
            default: Date.now,
        },
        company: {

        },
        positionName: {

        },
        salary: {

        },
        url: {

        },
        interview: {
            type: Boolean,
        },
        interviewDate: {
            type: Date,
        },
        industry: {

        }

    }
);

module.exports = jobApplication;