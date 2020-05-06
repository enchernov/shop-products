const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('../../apollo/typeDefs');
const resolvers = require('../../apollo/resolvers');

const server = new ApolloServer({
    typeDefs,
    resolvers,
    playground: {
        endpoint: `http://localhost:4000/api/graphql`,
        settings: {
            'editor.theme': 'light'
        }
    },
    context: ({req, res}) => {
        return {req, res}
    }
});

module.exports = server;
