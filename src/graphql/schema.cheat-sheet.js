const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
  GraphQLSchema
} = require('graphql');
const models = require('../../models');

const TagType = new GraphQLObjectType({
  name: 'TagType',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    articles: { type: new GraphQLList(ArticleType) }
  })
});

const ArticleType = new GraphQLObjectType({
  name: 'Article',
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    content: { type: GraphQLString },
    image: { type: GraphQLString },
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
        return models.article.findAll();
      }
    },
    article: {
      type: ArticleType,
      args: {
        id: { type: GraphQLInt }
      },
      async resolve(parent, args) {
        return models.article.findOne({
          where: {
            id: args.id
          }
        });
      }
    },
    tags: {
      type: new GraphQLList(TagType),
      async resolve(parent, args) {
        return models.tag.findAll();
      }
    },
    tag: {
      type: TagType,
      args: {
        id: { type: GraphQLInt }
      },
      async resolve(parent, args) {
        return models.tag.findOne({
          where: {
            id: args.id
          }
        });
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});