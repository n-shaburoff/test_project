const mongoose = require('mongoose');
//const config = require('config');

module.exports = function() {
    //const db = config.get('mongodb://localhost/test_project);
    mongoose.connect('mongodb://localhost/test_project', { useNewUrlParser: true , useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...'));
}
