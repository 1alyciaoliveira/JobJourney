// Import User Model and sign token function from auth
const { User } = require('../models');
const { signToken } = require('../utils/auth');

module.exports = {
    async getSingleUser({ user = null, params}, res) {
        const foundUser = await User.findOne({
            $or: [{ _id: user ? user._id : params.id}, { username: params.username }],
        });
        if (!foundUser) {
            return res.status(400).json({ message: 'User could not be found with this ID'});
        }
        res.json(foundUser);
    },

    // TODO: create a user function code here

    // TODO: login a user function code here
}
