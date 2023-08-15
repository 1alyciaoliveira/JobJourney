import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
        token
        user {
            _id
            username
        }
    }
}
`;

export const ADD_USER = gql`
mutation addUser($username: String!, $email: String! $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
        token
        user {
            _id
            username
        }
    }
}
`;

export const ADD_APPLICATION = gql`
mutation addJobApplication($InputJobApplication: InputJobApplication) {
    addJobApplication(InputJobApplication: $InputJobApplication) {
        _id
        username
        email
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
} 
`;

export const REMOVE_APPLICATION = gql `
mutation removeJobbApplication($jobId: jobId) {
    removeJobbApplication(jobId: $jobId) {
            _id
            username
            email
            jobCount
    }
}
`;