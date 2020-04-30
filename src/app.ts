import Express from "express";
import chalk from "chalk";
import loaders from "./loaders";
import { ENV } from "./config";

export const startServer = async ({ port }: { port: number }) => {
    console.log(chalk.bgBlue.black("Init"), `Server Init Start`);
    const app = Express();
    const apollo = await loaders.init({ expressApp: app, env: process.env.NODE_ENV as string });
    app.listen({ port });
    return { app, apollo };
};

startServer({ port: ENV.PORT }).then(({ app, apollo }) => {
    console.log(
        chalk.bgBlue.black("START"),
        `Apollo Server ready at port ${ENV.PORT}, the end point is  ${apollo.graphqlPath}`
    );
});
