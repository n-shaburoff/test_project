
module.exports = {
    getAllArticles:  async (req, res) => {
        const articles = await Article.find();
        res.send(articles);
    }
}