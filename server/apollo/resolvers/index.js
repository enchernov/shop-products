const AuthQuery = require("./queries/AuthQuery");
const AuthMutation = require("./mutations/AuthMutation");

module.exports = {
    Query: {
        ...AuthQuery
    },
    Mutation: {
        ...AuthMutation
    }
};
