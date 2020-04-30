import dotenv from "dotenv";
dotenv.config();

export default {
    development: {
        username: process.env.DB_NAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        host: "localhost",
        dialect: "mysql"
    },
    test: {
        username: process.env.TEST_DB_NAME,
        password: process.env.TEST_DB_PASSWORD,
        database: process.env.TEST_DB_DATABASE,
        host: "localhost",
        dialect: "mysql"
    },
    production: {
        username: process.env.DB_NAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        host: "localhost",
        dialect: "mysql"
    }
};
