import chalk from "chalk";
import { startServer } from "../../app";
import database from "../../models/mysql";

const TEST_PORT = 4000;

beforeAll(async () => {
    await startServer({ port: TEST_PORT });
});

afterAll(async () => {
    console.log(chalk.bgBlue.black("TEST"), "Clear Test setup");
    await database.Sequelize!.drop();
});
