"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.default = {
    development: {
        username: process.env.DB_NAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        host: "localhost",
        dialect: "mysql"
    },
    test: {
        username: process.env.DB_NAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
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
//# sourceMappingURL=index.js.map