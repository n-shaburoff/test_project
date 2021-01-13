const express = require('express');
const channels = require('../routes/channels');
const articles = require('../routes/articles');
const users = require('../routes/users');
const auth = require('../routes/auth');

module.exports = function(app) {
    app.use(express.json());
    app.use('/api/channels', channels);
    app.use('/api/articles', articles);
    app.use('/api/users', users);
    app.use('/api/auth', auth);
}