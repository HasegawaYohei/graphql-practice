'use strict';

const withPagination = require('sequelize-cursor-pagination');

module.exports = (sequelize, DataTypes) => {
  const articleWithPaginate = sequelize.define('articleWithPaginate', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    image: DataTypes.STRING
  }, {
    underscored: true,
  });
  articleWithPaginate.associate = models => {
    articleWithPaginate.belongsToMany(models.tag, { through: models.articleWithPaginateTag, foreignKey: 'articleId', otherKey: 'tagId' });
  };

  const options = {
    methodName: 'paginate',
    primaryKeyField: 'id'
  };

  withPagination(options)(articleWithPaginate);

  return articleWithPaginate;
};