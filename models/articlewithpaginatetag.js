'use strict';
module.exports = (sequelize, DataTypes) => {
  const articleWithPaginateTag = sequelize.define('articleWithPaginateTag', {
    articleId: {
      type: DataTypes.INTEGER,
      field: 'article_id',
      foreignKey: true
    },
    tagId: {
      type: DataTypes.INTEGER,
      field: 'tag_id',
      foreignKey: true
    }
  }, {
    underscored: true,
  });
  articleWithPaginateTag.associate = function(models) {
    // associations can be defined here
  };
  return articleWithPaginateTag;
};