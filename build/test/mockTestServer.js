"use strict";
const { ApolloServer } = require("apollo-server");
const graphqlConfig = require("../graphql");
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
        },
    },
    db,
    user: null,
};
module.exports = {
    testServer: new ApolloServer(Object.assign(Object.assign({}, graphqlConfig), { context: baseContext })),
    baseContext,
};
//# sourceMappingURL=mockTestServer.js.map