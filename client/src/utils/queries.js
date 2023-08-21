import { gql } from '@apollo/client';

export const QUERY_ME = gql`
query me {
    me {
        _id
        username
        email
        jobCount
        jobsApplied {
            _id
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
            userID
        }
    }
}`

export const QUERY_JOBS = gql `
query jobs {
    jobs {
        _id
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
        userID
    }
}
`

export const QUERY_PAYMENT = gql `
query createCheckoutSession {
    createCheckoutSession {
            url
    }
}
`