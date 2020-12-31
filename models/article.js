const mongoose = require('mongoose');
const Joi = require('joi');


const articleSchema = new mongoose.Schema({
    title: {
        type: String
    },
    link: {
        type: String,
    },
    channelId: String
});

const Article = mongoose.model('Article', articleSchema);


exports.Article = Article;
