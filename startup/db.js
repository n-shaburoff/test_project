const mongoose = require('mongoose');
const winston = require('winston');
//const config = require('config');

module.exports = function() {
    //const db = config.get('mongodb://localhost/test_project);
    mongoose.connect('mongodb://localhost/test_project', { useNewUrlParser: true , useUnifiedTopology: true })
  .then(() => winston.info('Connected to MongoDB...'));
}
