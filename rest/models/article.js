'use strict';
module.exports = (sequelize, DataTypes) => {
  const article = sequelize.define('article', {
    title: DataTypes.STRING,
    content: DataTypes.STRING
  }, {
    underscored: true,
  });
  article.associate = models => {
    article.belongsToMany(models.tag, { through: models.articletag, foreignKey: 'articleId', otherKey: 'tagId' });
  };
  return article;
};