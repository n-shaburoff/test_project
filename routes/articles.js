const express = require('express');
const router = express.Router();
const artcileController = require('../controllers/article');

router.get('/', artcileController.getAllArticles);

module.exports = router;