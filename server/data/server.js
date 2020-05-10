const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./typeDefs/typeDefs');
const resolvers = require('./resolvers/resolvers');

const apolloServer = new ApolloServer({
    typeDefs: typeDefs,
    resolvers: resolvers,
    playground: {
        endpoint: `http://localhost:4000/graphql`,
        settings: {
            'editor.theme': 'light'
        }
    },
    context: ({req, res}) => {
        return {req, res}
    }
});

module.exports = apolloServer;
