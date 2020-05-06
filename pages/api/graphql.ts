import { ApolloServer } from 'apollo-server-micro'
const { schema } = require( '../../apollo/schema');

require('dotenv').config();

const apolloServer = new ApolloServer({
    schema,
    context(ctx) {
        return ctx
    },
})

export const config = {
    api: {
        bodyParser: false,
    }
}

export default apolloServer.createHandler({ path: './api/graphql' })
