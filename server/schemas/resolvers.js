const { User, Jobs } = require('../models');
const { signToken } = require('../utils/auth');
const { AuthenticationError } = require('apollo-server-express');

//missing fixes in query and mutation to add authentication info and signToken.
const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({_id: context.user._id})
      }

      throw new AuthenticationError('Oops, you are not logged!');
    },
    jobs: async (parent, args, context) => {
      if (context.user) {
        return Jobs.find({userID: context.user._id})
      }

      throw new AuthenticationError('Oops, you are not logged!');
    } 
  },

  Mutation: {
    addUser: async (parent, { username, email, password}) => {
      const user = await User.create({ username, email, password});
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, {email, password}) => {
      const user = await User.findOne({ email });

      if (!user) {
        console.log('Error: auth failed');
        throw new AuthenticationError('Email or password incorrect!');
    }

    const correctPassword = await user.isCorrectPassword(password);

    if (!correctPassword) {
      console.log('Error: auth failed');
      throw new AuthenticationError('Email or password incorrect!');
    }

    const token = signToken(user);
    return { token, user };

  },
  addJobApplication: async (parent, args, context) => {
    const jobbAdded = await Jobs.create(args);
    return jobbAdded;
  },
  removeJobbApplication: async (parent, args, context) => {
    const updatedUser = await User.findOneAndUpdate(
      { _id: context.user._id },
      { $pull: { jobsApplied: {jobId: args.jobId} } }, //Duda: se usa objeto o array?
      { new: true }
    );
    return updatedUser;
  },
}
};

module.exports = resolvers;
