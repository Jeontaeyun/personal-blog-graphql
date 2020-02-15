import Express from "express";
import expressLoader from "./express";
import sequelizeLoader from "./sequelize";
import apolloLoader from "./apollo";
import { ApolloServer } from "apollo-server";

const init = async ({ expressApp, env }: { expressApp: Express.Application; env: string }): Promise<ApolloServer> => {
    try {
        const app = await expressLoader({ app: expressApp });
        const database = await sequelizeLoader();
        const apollo = await apolloLoader(database, app);
        return apollo as ApolloServer;
    } catch (error) {
        console.error(error);
        throw new Error(error);
    }
};

export default { init };
