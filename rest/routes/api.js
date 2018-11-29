const express = require('express');
const router = express.Router();
const models = require('../models');
const config = require('../config/config');

const wrapper = fn => (req, res, next) => fn (req, res).catch(next);

router.get('/articles', wrapper(async (req, res) => {
  const articles = await models.article.findAll();
  const response = articles.map(article => ( { uri: `/api/article/${article.id}`} ));
  res.status(200).json(response);
}));

router.get('/article/:id', wrapper(async (req, res) => {
  const article = (await models.article.findOne({
    where: {
      id: req.params.id
    }
  })).toJSON();
  const response = {
    ...article,
    tags: `/api/article/${article.id}/tags`
  };
  res.status(200).json(response);
}));

router.get('/article/:id/tags', wrapper(async (req, res) => {
  const article = await models.article.findOne({
    where: {
      id: req.params.id
    }
  });
  const tags = await article.getTags();
  const response = tags.map(tag => ({ uri: `/api/tag/${tag.id}` }));
  res.status(200).json(tags);
}));

router.get('/tags', wrapper(async (req, res) => {
  const tags = await models.tag.findAll();
  const response = tags.map(tag => ( { uri: `/api/tag/${tag.id}`} ));
  res.status(200).json(response);
}));

router.get('/tag/:id', wrapper(async (req, res) => {
  const tag = await models.tag.findOne({
    where: {
      id: req.params.id
    }
  });
  const response = tag.toJSON();
  res.status(200).json(response);
}));

router.get('/tag/:id/articles', wrapper(async (req, res) => {
  const tags = await models.tag.findOne({
    where: {
      id: req.params.id
    }
  });
  const articles = await tags.getArticles();
  res.status(200).json(articles);
}));

module.exports = router;
