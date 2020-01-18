import resolvers from "./resolvers";
import schema from "./schema";
import { gql } from "apollo-server-express";

export default {
    resolvers,
    typeDefs: gql(schema)
};
