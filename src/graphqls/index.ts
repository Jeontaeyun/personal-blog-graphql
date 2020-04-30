import resolvers from "./resolvers";
import { importSchema } from "graphql-import";

export default async () => {
    const typeDefs = await importSchema("src/graphqls/schemas/schema.graphql", {});
    return { resolvers, typeDefs };
};
