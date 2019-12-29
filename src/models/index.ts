import { Sequelize } from "sequelize";
import configuration from "../config";
import dotenv from "dotenv";

export interface IDatabaseTable {
    Category: any;
    Comment: any;
    Image: any;
    Post: any;
    Tag: any;
    User: any;
    Sequelize?: Sequelize;
}
type envType = "development" | "production";
type dbType = "mysql" | "mariadb" | "postgres" | "sqlite" | "mssql";
type DatabaseTableKey = keyof IDatabaseTable;

/**
 * * Setting Database Config
 */
dotenv.config();
const env = process.env.NODE_ENV as envType;
const envConfiguration = configuration[env];

const sequelize = new Sequelize(
    envConfiguration.database,
    envConfiguration.username,
    envConfiguration.password,
    {
        host: envConfiguration.host,
        dialect: envConfiguration.dialect as dbType,
        logging: false,
        retry: {
            // ! DB 호출 재설정 횟수를 제한할 수 있다.
            max: 10,
        },
        timezone: "+09:00", //"Asia/Seoul";
    },
);

import Category from "./category";
import Comment from "./comment";
import Image from "./image";
import Post from "./post";
import Tag from "./tag";
import User from "./user";

const database: IDatabaseTable = {
    Category: Category(sequelize),
    Comment: Comment(sequelize),
    Image: Image(sequelize),
    Post: Post(sequelize),
    Tag: Tag(sequelize),
    User: User(sequelize),
};

Object.keys(database).forEach((modelName, idx: number) => {
    const model = database[modelName as DatabaseTableKey];
    if (model && !(model instanceof Sequelize)) {
        model.connectAssociate(database);
    }
});

database.Sequelize = sequelize;

export default database;
