import { ApolloServer } from "apollo-server";
import graphqlConfig from "../graphqls";
import db from "../models";

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

export default {
    testServer: new ApolloServer({
        ...graphqlConfig,
        context: baseContext
    }),
    // For easy access in tests
    baseContext
};
