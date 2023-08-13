const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String
    jobsApplied: [JobApplication]
  }

  type JobApplication {
    dateApplied: String
    company: String
    positionName: String
    salary: Float
    url: String
    interview: String
    inverviewDate: String
    industry: String
    comments: String
    status: String
    reminder: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addJobApplication(jobApplication: JobApplication): User
  }
`;

module.exports = typeDefs;
