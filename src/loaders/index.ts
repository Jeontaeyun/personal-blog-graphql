import Express from "express";
import chalk from "chalk";
import { ApolloServer } from "apollo-server";

import expressLoader from "./express";
import sequelizeLoader from "./sequelize";
import apolloLoader from "./apollo";

const init = async ({ expressApp, env }: { expressApp: Express.Application; env: string }): Promise<ApolloServer> => {
    try {
        const app = await expressLoader({ app: expressApp });
        console.log(chalk.bgCyan.white("Success"), `Success express init lodaer`);
        const database = await sequelizeLoader();
        console.log(chalk.bgCyan.white("Success"), `Success sequelize init lodaer`);
        const apollo = await apolloLoader(database, app);
        console.log(chalk.bgCyan.white("Success"), `Success apllo init lodaer`);
        return apollo as ApolloServer;
    } catch (error) {
        console.error(error);
        throw new Error(error);
    }
};

export default { init };
