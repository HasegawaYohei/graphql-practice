'use strict';
module.exports = (sequelize, DataTypes) => {
  const articletag = sequelize.define('articletag', {
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
  articletag.associate = function(models) {
    // associations can be defined here
  };
  return articletag;
};