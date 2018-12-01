const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
  GraphQLSchema
} = require('graphql');
const models = require('../../models');

const TagType = new GraphQLObjectType({
  name: 'TagType',
  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString }
  })
});

const ArticleType = new GraphQLObjectType({
  name: 'Article',
  fields: () => ({
    id: { type: GraphQLInt },
    title: { type: GraphQLString },
    author: { type: GraphQLString },
    tags: { type: new GraphQLList(TagType) }
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    articles: {
      type: new GraphQLList(ArticleType),
      async resolve(parent, args) {
        // ../../models/article.js の hooks のコメントアウトを外さないとエラーになります.
        return await models.article.findAll();
      }
    },
    article: {
      type: ArticleType,
      args: {
        id: { type: GraphQLInt }
      },
      async resolve(parent, args) {
        const article = await models.article.findOne({
          where: {
            id: args.id
          }
        }).then(res => res);
        return modelService.buildArticle(article);
      }
    },
    tags: {
      type: new GraphQLList(TagType),
      resolve(parent, args) {
        return models.tag.findAll().then(res => res);
      }
    },
    tag: {
      type: TagType,
      args: {
        id: { type: GraphQLInt }
      },
      resolve(parent, args) {
        return models.tag.findOne({
          where: {
            id: args.id
          }
        }).then(res => res);
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});