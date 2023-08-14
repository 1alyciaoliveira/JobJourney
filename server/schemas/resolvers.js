const { User } = require('../models');
const { AuthenticationError } = require('apollo-server-express');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({_id: context.user._id})
      }
    },
  },

  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      // agregar const Token (con funcion de auth)
      return {user}; //agregar variable token 
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

    return { user };//Agregar const token

  },
  addJobApplication: async (parent, args, context) => {
    return User.findOneAndUpdate(
      { _id: context.user._id },
      { $addToSet: { jobsApplied: args } },
      { new: true }
    )
  },
  removeJobbApplication: async (parent, args, contect) => {
    return User.findOneAndUpdate(
      { _id: context.user._id },
      { $pull: { jobsApplied: {jobId: args.jobId} } },
      { new: true }
    )
  }

  
}
};

module.exports = resolvers;
