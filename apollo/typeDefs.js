const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        id: String!
        email: String!,
        username: String!
    }
    input SignUpInput {
        id: String!
        email: String!
        password: String!,
        username: String!
    }
    input SignInInput {
        email: String!
        password: String!
    }
    type SignUpPayload {
        user: User!
    }
    type SignInPayload {
        user: User!
    }
    type Query {
        user(id: ID!): User!
        viewer: User
    }
    type Mutation {
        signUp(input: SignUpInput!): SignUpPayload!
        signIn(input: SignInInput!): SignInPayload!
        signOut: Boolean!
    }
`;

module.exports = typeDefs;
