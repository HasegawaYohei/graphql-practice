const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLInt,
  GraphQLString,
  GraphQLBoolean,
  GraphQLList,
  GraphQLSchema
} = require('graphql');
const models = require('../../models');

const asyncMap = (arr, fn) => Promise.all(arr.map(async v => await fn(v)));

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

const ArticlesConnection = new GraphQLObjectType({
  name: 'ArticlesConnection',
  fields: () => ({
    pageInfo: { type: PageInfo },
    edges: { type: new GraphQLList(ArticlesEdge) },
  })
});

const PageInfo = new GraphQLObjectType({
  name:'PageInfo',
  fields: () => ({
    before: { type: GraphQLString },
    after: { type: GraphQLString },
    hasNext: { type: GraphQLBoolean },
    hasPrevious: { type: GraphQLBoolean }
  })
});

const ArticlesEdge = new GraphQLObjectType({
  name: 'ArticlesEdge',
  fields: () => ({
    cursor: { type: GraphQLInt },
    node: { type: ArticleType }
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    articles: {
      type: ArticlesConnection,
      args: {
        after: { type: GraphQLString }
      },
      async resolve(parent, args) {
        console.dir(args.after);
        const paginate = await models.articleWithPaginate.paginate({
          limit: 5,
          after: args.after,
          include: [{
            model: models.tag,
            required: false,
            attributes: ['id', 'name'],
            through: { attributes: [] }
          }]
        });

        const pageInfo = paginate.cursors;
        const edges = await asyncMap(paginate.results, async article => ( { node: article.toJSON() } ));

        return {
          pageInfo,
          edges
        };
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
            id: args.id,
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
