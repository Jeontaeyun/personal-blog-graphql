import Express from "express";
import { ApolloServer } from "apollo-server-express";
import getGraphQlConfig from "../graphqls";
import { IDatabase } from "models";

export default async (database: IDatabase, app: Express.Application): Promise<ApolloServer> => {
    try {
        // Apollo Server Init
        const graphqlConfig = await getGraphQlConfig();
        const apollo = new ApolloServer({
            ...graphqlConfig,
            playground: {
                settings: {
                    "request.credentials": "include"
                }
            },
            /**
             *  Context object is one that gets passed to every single resolvers at every level
             **/
            context: ({ req }: { req: Express.Request & { user: any } }) => {
                let user = null;
                if (req.user) {
                    user = req.user.toJSON();
                }
                if (!user) {
                    console.log("유저가 존재하지 않습니다.");
                    return { database, req };
                }
                return { database, user, req };
            }
        });
        apollo.applyMiddleware({ app, path: "/graphql" });
        return apollo;
    } catch (error) {
        console.error(error);
        throw new Error(error);
    }
};
