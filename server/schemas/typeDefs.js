const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    jobCount: Int
    jobsApplied: [JobApplication]
    # jobsApplied: [String]
  }

  type JobApplication {
    _id: ID!
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

  # input InputJobApplication {
  #   jobId: String
  #   dateApplied: String
  #   company: String
  #   jobPosition: String
  #   salary: Int
  #   url: String
  #   interview: Boolean
  #   interviewDate: String
  #   comments: String
  #   status: String
  #   reminder: Boolean
  #   reminderDate: String
  #   userID: String
  # }

  type Mutation {
    login(email: String!, password: String!): Auth

    addUser(username: String!, email: String!, password: String!): Auth

    addJobApplication(dateApplied: String, company: String, jobPosition: String, salary: Int, url: String, interview: Boolean, interviewDate: String, comments: String, status: String, reminder: Boolean, reminderDate: String, userID: String): JobApplication

    removeJobApplication(_id: ID): JobApplication

    updateJobbApplication(dateApplied: String, company: String, jobPosition: String, salary: Int, url: String, interview: Boolean, interviewDate: String, comments: String, status: String, reminder: Boolean, reminderDate: String, userID: String): JobApplication
  }
`;

module.exports = typeDefs;

