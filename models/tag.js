'use strict';
module.exports = (sequelize, DataTypes) => {
  const tag = sequelize.define('tag', {
    name: DataTypes.STRING
  }, {
    underscored: true,
  });
  tag.associate = models => {
    tag.belongsToMany(models.article, { through: models.articletag, foreignKey: 'tagId', otherKey: 'articleId' });
    tag.belongsToMany(models.articleWithPaginate, { through: models.articleWithPaginateTag, foreignKey: 'tagId', otherKey: 'articleId' });
  };
  return tag;
};