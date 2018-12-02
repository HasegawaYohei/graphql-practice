'use strict';

const internalGetTags = async article => {
  const tags = await article.getTags();
  article.tags = tags;
  article.dataValues.tags = tags;
}

const getTags = async (result, options) => {
  const isInstanceofArray = (result instanceof Array);

  if (isInstanceofArray) {
    for (let article of result) {
      await internalGetTags(article);
    }
  } else {
    await internalGetTags(result);
  }

  return result;
}

module.exports = (sequelize, DataTypes) => {
  const article = sequelize.define('article', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    image: DataTypes.STRING
  }, {
    underscored: true,
    hooks: {
      // afterFind: getTags
    }
  });
  article.associate = models => {
    article.belongsToMany(models.tag, { through: models.articletag, foreignKey: 'articleId', otherKey: 'tagId' });
  };
  return article;
};