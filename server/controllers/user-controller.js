const { User } = require('../models/user');
const { signToken } = require('../utils/auth');

module.exports = {

    async getSingleUSer ({ user = null, params }, res) {
        const locateUser = await User.findOne({
            $or: [{ _id: user ? user._id : params.id }, { username: params.username }],
        });

        if (!locateUser) {
            return res.status(400).json({ message: 'Sorry, no user with this ID!' });
        }

        res.json(locateUser);
    },

    async createUser ({ body }, res) {
        const user = await User.create(body);

        if (!user) {
            return res.status(400).json({ message: 'Uh oh, sorry, something went wrong!' });
        }

        const token = signToken(user); //Send it back to the client (use it to sign up form)
        res.json({ token, user });
    },


    async login ({ body }, res) {
        const user = await User.findOne({ $or: [{ username: body.username }, { email: body.email }] });
        if (!user) {
            return res.status(400).json({ message: 'Sorry, no user with this ID!' });
        }

        const correctPw = await user.isCorrectPassword(body.password);

        if (!correctPw) {
            return res.status(400).json({ message: 'Oops, wrong password!' });
        }

        const token = signToken(user); //Send it back to the client (use it to login form)
        res.json({ token, user });
    }
    
};