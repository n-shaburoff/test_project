const express = require('express');
const channels = require('../routes/channels');
const articles = require('../routes/articles');

module.exports = function(app) {
    app.use(express.json());
    app.use('/api/channels', channels);
    app.use('/api/articles', articles);
}