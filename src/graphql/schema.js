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
        return models.article.findAll({
          include: [{
            model: models.tag,
            required: false,
            attributes: ['id', 'name'],
            through: { attributes: [] }
          }],
        });
      }
    },
    article: {
      type: ArticleType,
      args: {
        id: { type: GraphQLInt }
      },
      async resolve(parent, args) {
        return models.article.findOne({
          include: [{
            model: models.tag,
            required: false,
            attributes: ['id', 'name'],
            through: { attributes: [] }
          }],
          where: {
            id: args.id
          }
        });
      }
    },
    tags: {
      type: new GraphQLList(TagType),
      async resolve(parent, args) {
        return models.tag.findAll({
          include: [{
            model: models.article,
            required: false,
            attributes: ['id', 'title'],
            through: { attributes: [] }
          }]
        });
      }
    },
    tag: {
      type: TagType,
      args: {
        id: { type: GraphQLInt }
      },
      async resolve(parent, args) {
        return models.tag.findOne({
          include: [{
            model: models.article,
            required: false,
            attributes: ['id', 'title'],
            through: { attributes: [] }
          }],
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