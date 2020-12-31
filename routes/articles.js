const express = require('express');
const router = express.Router();const {Channel, validateChannel} = require('../models/channel');
const {Article, validateArticle} = require('../models/article');


router.get('/', async (req, res) => {
    const articles = await Article.find();
    res.send(articles);
});

module.exports = router;