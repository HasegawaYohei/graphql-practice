// require('graphql') から 使用するクラスなどを読み込みます
const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
  GraphQLSchema
} = require('graphql');
// 今回使用するデータリソースは DB なので Sequelize のモデルを読み込みます
const models = require('../../models');

// 使用するデータの Schema(Type) を定義します
const TagType = new GraphQLObjectType({
  name: 'TagType',
  fields: () => ({
  })
});

const ArticleType = new GraphQLObjectType({
});

// RootQuery として定義したデータすべてにリンクを辿れるような Schema(Type) を定義します
const RootQuery = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    articles: {
      type: new GraphQLList(ArticleType),
      async resolve(parent, args) {
        return models.article.findAll();
      }
    },
  }
});

// query に RootQuery を指定して GraphQLSchema のインスタンスを export します
module.exports = new GraphQLSchema({
  query: RootQuery
});