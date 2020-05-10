const { makeExecutableSchema } = require('graphql-tools')
const typeDefs = require('./typeDefs/typeDefs');

export const schema = makeExecutableSchema({
    typeDefs
});
