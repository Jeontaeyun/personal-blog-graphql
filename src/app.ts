import Express from "express";
import chalk from "chalk";
import loaders from "./loaders";

const startServer = async () => {
    console.log(chalk.bgBlue.black("Init"), `Server Init Start`);
    const app = Express();
    const apollo = await loaders.init({ expressApp: app, env: process.env.NODE_ENV || "development" });
    app.listen({ port: 8080 });
    return { app, apollo };
};

startServer().then(({ app, apollo }) => {
    console.log(chalk.bgBlue.black("START"), `Apollo Server ready at http${apollo.graphqlPath}`);
});
