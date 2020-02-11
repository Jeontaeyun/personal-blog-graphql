"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_1 = __importDefault(require("../config"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const env = process.env.NODE_ENV;
const envConfiguration = config_1.default[env];
const sequelize = new sequelize_1.Sequelize(envConfiguration.database, envConfiguration.username, envConfiguration.password, {
    host: envConfiguration.host,
    dialect: envConfiguration.dialect,
    logging: true,
    retry: {
        max: 10
    },
    timezone: "+09:00"
});
const category_1 = __importDefault(require("./category"));
const comment_1 = __importDefault(require("./comment"));
const image_1 = __importDefault(require("./image"));
const post_1 = __importDefault(require("./post"));
const tag_1 = __importDefault(require("./tag"));
const user_1 = __importDefault(require("./user"));
const database = {
    User: user_1.default(sequelize),
    Category: category_1.default(sequelize),
    Comment: comment_1.default(sequelize),
    Image: image_1.default(sequelize),
    Post: post_1.default(sequelize),
    Tag: tag_1.default(sequelize)
};
Object.keys(database).forEach((modelName, idx) => {
    const model = database[modelName];
    if (model && !(model instanceof sequelize_1.Sequelize)) {
        model.connectAssociate(database);
    }
});
database.Sequelize = sequelize;
exports.default = database;
//# sourceMappingURL=index.js.map