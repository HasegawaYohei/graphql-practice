const express = require('express');
const router = express.Router();
const models = require('../../../models');

const asyncMap = (arr, fn) => Promise.all(arr.map(async v => await fn(v)));

const wrapper = fn => (req, res, next) => fn (req, res).catch(next);

router.get('/articles', wrapper(async (req, res) => {
  const articles = await models.article.findAll();
  const response = articles.map(article => ( { uri: `/api/article/${article.id}`} ));
  return res.status(200).json(response);
}));

router.get('/article/:id', wrapper(async (req, res) => {
  const article = (await models.article.findOne({
    where: {
      id: req.params.id
    }
  })).toJSON();
  // return res.status(200).json(article);
  const response = {
    ...article,
    tags: `/api/article/${article.id}/tags`
  };
  return res.status(200).json(response);
}));

router.get('/article/:id/tags', wrapper(async (req, res) => {
  const article = await models.article.findOne({
    where: {
      id: req.params.id
    }
  });
  const tags = await article.getTags();
  const response = tags.map(tag => ({ uri: `/api/tag/${tag.id}` }));
  return res.status(200).json(response);
}));

router.get('/tags', wrapper(async (req, res) => {
  const tags = await models.tag.findAll();
  const response = tags.map(tag => ( { uri: `/api/tag/${tag.id}`} ));
  return res.status(200).json(response);
}));

router.get('/tag/:id', wrapper(async (req, res) => {
  const tag = await models.tag.findOne({
    where: {
      id: req.params.id
    }
  });
  const response = tag.toJSON();
  return res.status(200).json(response);
}));

router.get('/tag/:id/articles', wrapper(async (req, res) => {
  const tags = await models.tag.findOne({
    where: {
      id: req.params.id
    }
  });
  const articles = await tags.getArticles();
  return res.status(200).json(articles);
}));

router.get('/articlesAndTags', wrapper(async (req, res) => {
  const articles = await models.article.findAll();
  //return res.status(200).json(articles);
  const response = await asyncMap(articles, async article => {
    const articleJSON = article.toJSON();
    const tags = await article.getTags();

    articleJSON.tags = tags;
    return articleJSON;
  });
  return res.status(200).json(response);
}));

module.exports = router;
