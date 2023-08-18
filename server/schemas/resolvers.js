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
  addJobApplication: async (parent, { dateApplied, company, jobPosition, salary, url, interview, interviewDate, comments, status, reminder, reminderDate }, context) => {
    const jobAdded = await Jobs.create({
      dateApplied,
      company,
      jobPosition,
      salary,
      url,
      interview,
      interviewDate,
      comments,
      status,
      reminder,
      reminderDate,
      userID: context.user._id,
      });

      await User.findOneAndUpdate(
        { _id: context.user._id },
        { $addToSet: { jobsApplied: jobAdded._id } }
      );

    return jobAdded;
  },
  removeJobApplication: async (parent, args, context) => {
    const removedJobApplication = await Jobs.findOneAndDelete({
      _id: args._id
    });
    console.log(args._id)
console.log(removedJobApplication);
    await User.findOneAndUpdate (
      { _id: context.user._id},
      { $pull: { jobsApplied: args._id } },
      { new: true }
    );
    return removedJobApplication;
  },
  updateJobApplication: async (parent, args, context) => {
    const updatedJobApplication = await Jobs.findOneAndUpdate(
      { _id: args._id },
      { $addToSet: {
        dateApplied: args.dateApplied,
        company: args.company,
        jobPosition: args.jobPosition,
        salary: args.salary,
        url: args.url,
        interview: args.interview,
        interviewDate: args.interviewDate,
        comments: args.comments,
        status: args.status,
        reminder: args.reminder,
        reminderDate: args.reminderDate
      }},
      { new: true }
      );
      return updatedJobApplication;
  }
}
};

module.exports = resolvers;
