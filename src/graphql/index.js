const resolvers = require("./resolvers");
const schema = require("./schema");
const { gql } = require("apollo-server-express");
module.exports = {
    resolvers,
    typeDefs: gql(schema),
};
