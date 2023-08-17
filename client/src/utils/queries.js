import { gql } from '@apollo/client';

export const QUERY_ME = gql`
query me {
    me {
        _id
        username
        email
        jobCount
    }
}`

export const QUERY_JOBS = gql `
query jobs {
    jobs {
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
`