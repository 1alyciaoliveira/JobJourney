const { User, Jobs } = require('../models');
const { signToken } = require('../utils/auth');
const { AuthenticationError } = require('apollo-server-express');
const bcrypt = require('bcrypt');
dotenv = require('dotenv').config();
const stripe = require('stripe')(`${process.env.STRIPE_KEY}`);

const URL_HEROKU = 'https://ancient-everglades-97703-e6a603057067.herokuapp.com/'; //add heroku url

//missing fixes in query and mutation to add authentication info and signToken.
const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({_id: context.user._id}).populate('jobsApplied');
      }

      throw new AuthenticationError('Oops, you are not logged!');
    },
    jobs: async (parent, args, context) => {
      if (context.user) {
        const response = await Jobs.find({userID: context.user._id});
        return response;
      }
      throw new AuthenticationError('Oops, you are not logged!');
    },
    createCheckoutSession: async () => {
      const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            price: 'price_1NhNJIF9kLAVf4oMYHB7b9Gh',
            quantity: 1
          }
        ],
        mode: 'payment',
        success_url: URL_HEROKU + 'success',
        cancel_url: URL_HEROKU + 'cancel'
      });

      return {
        url: session.url
      }
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
      ).populate('jobsApplied');

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
      { _id: args._id }, //Construir el boton onclik
      { 
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
      },
      { new: true }
      );
      return updatedJobApplication;
  },
  updatePassword: async (parent, args, context) => {
    const psw = args.password;
    const hashPassword = await bcrypt.hash(psw, 10);
    
    const userUpdated = await User.findOneAndUpdate(
      { _id: context.user._id },
      { password: hashPassword }, 
      { new: true }
    );
    return userUpdated;
  }
}
};

module.exports = resolvers;
