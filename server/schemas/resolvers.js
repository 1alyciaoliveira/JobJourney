const { User } = require('../models');
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
  },

  Mutation: {
    addUser: async (parent, { username, email, password}) => {
      const user = await User.create({ username, email, password});
      // agregar const Token (con funcion de auth)
      const token = signToken(user);
      return { token, user }; //agregar variable token 
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
    //const token 
    const token = signToken(user);
    return { token, user };//Agregar const token

  },
  addJobApplication: async (parent, args, context) => {
    return User.findOneAndUpdate(
      { _id: context.user._id },
      { $addToSet: { jobsApplied: args } },
      { new: true }
    )
  },
  removeJobbApplication: async (parent, args, context) => {
    return User.findOneAndUpdate(
      { _id: context.user._id },
      { $pull: { jobsApplied: {jobId: args.jobId} } },
      { new: true }
    )
  }

  
}
};

module.exports = resolvers;
