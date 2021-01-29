
const articleController =  {
    getAllArticles:  async (req, res) => {
        const articles = await Article.find();
        res.send(articles);
    }
}

module.exports = articleController;