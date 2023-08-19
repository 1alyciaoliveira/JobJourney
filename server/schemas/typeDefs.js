const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    jobCount: Int
    jobsApplied: [JobApplication]
  }

  type JobApplication {
    _id: ID!
    dateApplied: String
    company: String
    jobPosition: String
    salary: String
    url: String
    interview: Boolean
    interviewDate: String
    comments: String
    status: String
    reminder: Boolean
    reminderDate: String
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
    jobs: [JobApplication]
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

    addJobApplication(dateApplied: String, company: String, jobPosition: String, salary: String, url: String, interview: Boolean, interviewDate: String, comments: String, status: String, reminder: Boolean, reminderDate: String, userID: String): JobApplication

    removeJobApplication(_id: ID): JobApplication

    updateJobApplication(_id: ID, dateApplied: String, company: String, jobPosition: String, salary: String, url: String, interview: Boolean, interviewDate: String, comments: String, status: String, reminder: Boolean, reminderDate: String, userID: String): JobApplication

    # updatePassword(username: String, email: String): User
  }
`;

module.exports = typeDefs;

