import Express from "express";
import { ApolloServer } from "apollo-server-express";
import getGraphQlConfig from "../graphqls";
import { IDatabase } from "models/mysql";

export default async (database: IDatabase, app: Express.Application): Promise<ApolloServer> => {
    try {
        // Apollo Server Init
        const graphqlConfig = await getGraphQlConfig();
        const apollo = new ApolloServer({
            ...graphqlConfig,
            playground: {
                endpoint: "/graphql",
                settings: {
                    "request.credentials": "include"
                }
            },
            /**
             *  Context object is one that gets passed to every single resolvers at every level
             **/
            context: ({ req, res }: { req: Express.Request & { user: any }; res: Express.Response }) => ({
                req,
                res,
                getUser: () => req.user
            })
        });
        apollo.applyMiddleware({ app, path: "/graphql" });
        return apollo;
    } catch (error) {
        console.error(error);
        throw new Error(error);
    }
};
