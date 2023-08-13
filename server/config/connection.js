const mongoose = require('mongoose');
// change the name for the DB that will be on MongoDB Atlas
mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/name-of-DB-on-Atlas'
);

module.exports = mongoose.connection;
