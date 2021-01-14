const express = require('express');
const router = express.Router();
const {Channel, validateChannel} = require('../models/channel');
const {Article, validateArticle} = require('../models/article');
const auth = require('../middleware/auth');
const rss = require('../rss/rss');
const admin = require('../middleware/admin');

router.get('/', async (req, res) => {
  const channels = await Channel.find();
  res.send(channels);
});

router.get('/search', async (req, res) => {
  const channels = await Channel.find({ $text: { $search: req.body.keyword } });
  res.send(channels);
});

router.get('/filter', async (req, res) => {
  const channels = await Channel.find();
  for (var index in channels) {
    var categories = [];
      for (let i = 0; i < channels.length; i++) {
        categories[i] = channels[index].categories;
      }
  }

  var result = categories.shift().filter(function(v) {
    return categories.every(function(a) {
        return a.indexOf(v) !== -1;
    });
  });

  let _query = {
    categories: {
      $in: result
    }
  };

  const res_channels = await Channel.find(_query);
  res.send(res_channels);
});

router.post('/', auth, async (req, res) => {
  const { error } = validateChannel(req.body); 
  if (error) return res.status(400).send(error.details[0].message);
  
   let channel = await Channel.findOne({ name: req.body.name });
   if (channel) return res.status(400).send('Сhannel is already in the database.');

  try {
    let articles = (await rss(req.body.link)).items;
    let channel = new Channel ({
      name: req.body.name, 
      link: req.body.link,
      description: (await rss(req.body.link)).description,
      categories: (await rss(req.body.link)).itunes.categories
    });
    console.log((await rss(req.body.link)).itunes.categories);
    
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

router.put('/:id', [auth, admin], async (req, res) => {
  const { error } = validateChannel(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const channel = await Channel.findByIdAndUpdate(req.params.id, { name: req.body.name, link: req.body.link }, {
    new: true
  });

  if (!channel) return res.status(404).send('The channel with the given ID was not found.');
  
  res.send(channel);
});

router.delete('/:id', [auth, admin], async (req, res) => {
  const channel = await Channel.findByIdAndRemove(req.params.id);
  const articles = await Article.deleteMany({channelId: req.params.id});

  if (!channel) return res.status(404).send('The channel with the given ID was not found.');

  res.send(channel);
});

router.get('/:id', async (req, res) => {
  const channel = await Channel.findById(req.params.id);
  if (!channel) return res.status(404).send('The channel with the given ID was not found.');
  const articles = await Article.find({channelId: channel._id});
  res.send(articles);
});

module.exports = router;