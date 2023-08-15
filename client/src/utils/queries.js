import { gql } from '@apollo/client';

export const QUERY_ME = gql`
query me {
    me {
        _id
        username
        email
        jobCount
        jobsApplied {
            jobId
            dateApplied
            company
            jobPosition
            salary
            url
            interview
            interviewDate
            comments
            status
            reminder
            reminderDate
        }
    }
}`