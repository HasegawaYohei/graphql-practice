const express = require('express');
const graphqlHTTP = require('express-graphql');
const morgan = require('morgan');
const cors = require('cors');
const Schema = require('./schema');

const app = express();

app.use(morgan('dev'));
app.use(cors());

app.use('/graphql', graphqlHTTP({
  schema: Schema,
  graphiql: true
}));

module.exports = app;
