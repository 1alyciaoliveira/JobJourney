const mongoose = require('mongoose');
// Name for the DB that will be on MongoDB Atlas
mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/jobtracker'
);

module.exports = mongoose.connection;
