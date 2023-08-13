const { User } = require('../models');

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
      // const token
      return {user};
    },
    login: async (parent, {email, password}) => {
      const user = await User.findOne({ email });

      if (!user) {
        console.log('Error: auth failed');
    }

    const correctPassword = await user.isCorrectPassword(password);

    if (!correctPassword) {
      console.log('Auth failed');
    }

    return { token, user };

  },

  
}
};

module.exports = resolvers;
