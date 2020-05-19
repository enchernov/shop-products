const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID!
        username: String!
        email: String!
        password: String!
    }
    
    input SignUpInput {
        email: String!
        username: String!
        password: String!
        confirmPassword: String!
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
        viewer: User
    }
    
    type Mutation {
        signUp(input: SignUpInput!): SignUpPayload!
        signIn(input: SignInInput!): SignInPayload!
        signOut: Boolean!
    }
`;

module.exports = typeDefs;
