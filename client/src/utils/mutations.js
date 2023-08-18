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
mutation addJobApplication(
        $dateApplied: String,
        $company: String,
        $jobPosition: String,
        $salary: String, 
        $url: String, 
        $interview: Boolean, 
        $interviewDate: String, 
        $comments: String, 
        $status: String, 
        $reminder: Boolean, 
        $reminderDate: String, 
        $userID: String
) {
    addJobApplication(
        dateApplied: $dateApplied,
        company: $company,
        jobPosition: $jobPosition,
        salary: $salary, 
        url: $url, 
        interview: $interview, 
        interviewDate: $interviewDate, 
        comments: $comments, 
        status: $status, 
        reminder: $reminder, 
        reminderDate: $reminderDate, 
        userID: $userID
        ) {
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
        _id
        # _id
        # username
        # email
        # jobsApplied {
        #     jobId
        #     dateApplied
        #     company
        #     jobPosition
        #     salary
        #     url
        #     interview
        #     interviewDate
        #     comments
        #     status
        #     reminder
        #     reminderDate
        # }
    }
} 
`;

export const REMOVE_APPLICATION = gql `
mutation removeJobApplication($jobId: jobId) {
    removeJobApplication(jobId: $jobId) {
            _id
            username
            email
            jobCount
    }
}
`;