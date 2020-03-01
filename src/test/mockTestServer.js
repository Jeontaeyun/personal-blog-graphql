const { ApolloServer } = require("apollo-server");
const graphqlConfig = require("../graphqls");
const db = require("../models");
const baseContext = {
    req: {
        user: null,
        login: (user, cb) => {
            this.user = user;
            baseContext.user = user;
            cb();
        },
        logout: () => {
            baseContext.user = null;
            this.user = null;
        }
    },
    db,
    user: null
};

module.exports = {
    testServer: new ApolloServer({
        ...graphqlConfig,
        context: baseContext
    }),
    // For easy access in tests
    baseContext
};
