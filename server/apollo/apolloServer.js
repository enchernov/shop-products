const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./typeDefs/typeDefs');
const resolvers = require('./resolvers');
const models = require('../models');

const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req, res }) => {
        return { req, res, models }
    }
});

module.exports = apolloServer;
