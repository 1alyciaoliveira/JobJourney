const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String
    jobsApplied: [JobApplication]
  }

  type JobApplication {
    jobId: String
    dateApplied: String
    company: String
    jobPosition: String
    salary: Int
    url: String
    interview: Boolean
    inverviewDate: String
    comments: String
    status: String
    reminder: Boolean
    reminderDate: String
  }

  type Auth {
    token: String
    user: User
  }

  type Query {
    me: User
  }

  type Mutation {
    login(email: String!, password: String!): Auth

    addUser(username: String!, email: String!, password: String!): Auth

    addJobApplication(jobId: String, dateApplied: String, company: String, jobPosition: String, salary: Int, url: String, interview: Boolean, inverviewDate: String, comments: String, status: String, reminder: Boolean, reminderDate:String): User

    removeJobbApplication(jobId: String): User
  }
`;

module.exports = typeDefs;
