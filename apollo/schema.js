import { makeExecutableSchema } from 'graphql-tools';
const typeDefs = require('./typeDefs');

export const schema = makeExecutableSchema({
    typeDefs
});