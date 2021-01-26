require('dotenv').config();
const config = require('config');

module.exports = function() {
  if (!process.env.test_privateKey) {
    throw new Error('FATAL ERROR: test_privateKey is not defined.');
  }
}