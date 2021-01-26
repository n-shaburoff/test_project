const express = require('express');
const channels = require('../api/routes/channels');
const articles = require('../api/routes/articles');
const users = require('../api/routes/users');
const auth = require('../api/routes/auth');
const error = require('../middleware/error');

module.exports = function(app) {
    app.use(express.json());
    app.use('/api/channels', channels);
    app.use('/api/articles', articles);
    app.use('/api/users', users);
    app.use('/api/auth', auth);
    app.use(error);
}