module.exports = {
  async buildArticle(article) {
    const tags = await article.getTags();
    const articleJSON = article.toJSON();
    articleJSON.tags = tags;
    return  articleJSON;
  }
}