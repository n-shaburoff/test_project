const express = require('express');
const router = express.Router();
const {Channel, validateChannel} = require('../models/channel');
const {Article, validateArticle} = require('../models/article');
const rss = require('../rss/rss');

router.get('/', async (req, res) => {
    const channels = await Channel.find();
    res.send(channels);
});

router.post('/', async (req, res) => {
  const { error } = validateChannel(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  try {
    let articles = (await rss(req.body.link)).items;
    let channel = new Channel({name: req.body.name, link: req.body.link});
    channel = await channel.save();
    for (var index in articles) {
      let article = new Article({
        title: articles[index].title,
        link: articles[index].link,
        channelId: channel._id
      });
      article = await article.save();
    }
    res.send(channel);
  }
  catch(err) {
    console.error(err.message);
  }

  
    
});

router.delete('/:id', async (req, res) => {
  const channel = await Channel.findByIdAndRemove(req.params.id);
  const articles = await Article.deleteMany({channelId: req.params.id});

  if (!channel) return res.status(404).send('The channel with the given ID was not found.');

  res.send(channel);
});

router.get('/:id', async (req, res) => {
  const channel = await Channel.findById(req.params.id);
  if (!channel) return res.status(404).send('The genre with the given ID was not found.');
  const articles = await Article.find({channelId: channel._id});
  res.send(articles);
});

module.exports = router;