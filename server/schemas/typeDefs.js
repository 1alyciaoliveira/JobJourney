const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    jobCount: Int
    # jobsApplied: [JobApplication]
    jobsApplied: [String]
  }

  type JobApplication {
    jobId: String
    dateApplied: String
    company: String
    jobPosition: String
    salary: Int
    url: String
    interview: Boolean
    interviewDate: String
    comments: String
    status: String
    reminder: Boolean
    reminderDate: String
    # userID: ID
    userID: String
  }

  type Auth {
    token: String
    user: User
  }

  type Query {
    me: User
  }

  type Query {
    jobs: JobApplication
  }

  input InputJobApplication {
    jobId: String
    dateApplied: String
    company: String
    jobPosition: String
    salary: Int
    url: String
    interview: Boolean
    interviewDate: String
    comments: String
    status: String
    reminder: Boolean
    reminderDate: String
    userID: String
  }

  type Mutation {
    login(email: String!, password: String!): Auth

    addUser(username: String!, email: String!, password: String!): Auth

    addJobApplication(InputJobApplication: InputJobApplication): JobApplication

    removeJobbApplication(jobId: String): User

    updateJobbApplication(InputJobApplication: InputJobApplication): JobApplication
  }
`;

module.exports = typeDefs;

