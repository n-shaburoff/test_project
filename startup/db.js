require('dotenv').config();
const mongoose = require('mongoose');
const winston = require('winston');

module.exports = function() {
    mongoose.connect(process.env.DB_CONN, { useNewUrlParser: true , useUnifiedTopology: true })
  .then(() => winston.info('Connected to MongoDB...'));
}
