let Parser = require('rss-parser');
let parser = new Parser();

module.exports = async (url) => {
  let feed = await parser.parseURL(url);
  return feed;
};