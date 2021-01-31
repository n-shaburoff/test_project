const {Channel, validateChannel} = require('../models/channel');
const {Article, validateArticle} = require('../models/article');
const rss = require('../utils/rss');

const channelController = {
    createChannel: async (req, res) => {
        const { error } = validateChannel(req.body); 
        if (error) return res.status(400).send(error.details[0].message);
  
        let channel = await Channel.findOne({ name: req.body.name });
        if (channel) return res.status(400).send('Сhannel is already in the database.');

        let articles = (await rss(req.body.link)).items;

        channel = new Channel ({
            name: req.body.name, 
            link: req.body.link,
            description: (await rss(req.body.link)).description,
            categories: (await rss(req.body.link)).itunes.categories
        });
    
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
    },
    updateChannel:  async (req, res) => {
        const { error } = validateChannel(req.body); 
        if (error) return res.status(400).send(error.details[0].message);
      
        const channel = await Channel.findByIdAndUpdate(req.params.id, { name: req.body.name, link: req.body.link }, {
          new: true
        });
      
        if (!channel) return res.status(404).send('The channel with the given ID was not found.');
        
        res.send(channel);
    },
    deleteChannel:  async (req, res) => {
        const channel = await Channel.findByIdAndRemove(req.params.id);
        const articles = await Article.deleteMany({channelId: req.params.id});
      
        if (!channel) return res.status(404).send('The channel with the given ID was not found.');
      
        res.send(channel);
    },
    getChannelById:  async (req, res) => {
        const channel = await Channel.findById(req.params.id);
        if (!channel) return res.status(404).send('The channel with the given ID was not found.');
        const articles = await Article.find({channelId: channel._id});
        res.send(articles);
    },
    filterChannelByCategory:  async (req, res) => {
        const channels = await Channel.find();
        for (var index in channels) {
          var categories = [];
            for (let i = 0; i < channels.length; i++) {
              categories[i] = channels[index].categories;
            }
        }
      
        let result = categories.shift().filter(function(v) {
          return categories.every(function(a) {
              return a.indexOf(v) !== -1;
          });
        });
      
        let _query = {
          categories: {
            $in: result
          }
        }
        
        const res_channels = await Channel.find(findCommonCategories(channels));
        res.send(res_channels);
    },
    getAllChannels: async (req, res) => {
        const channels = await Channel.find();
        res.send(channels);
    },
    searchChannelByKey: async (req, res) => {
        const channels = await Channel.find({ $text: { $search: req.body.keyword } });
        res.send(channels);
    }
    
}

module.exports = channelController;