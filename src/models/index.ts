import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import sequelizeConfig from "config/sequelizeConfig";

export interface IDatabase {
    Category: CategoryStatic;
    Comment: CommentStatic;
    Image: ImageStatic;
    Post: PostStatic;
    Tag: TagStatic;
    User: UserStatic;
    Sequelize?: Sequelize;
}
type envType = "development" | "production";
type dbType = "mysql" | "mariadb" | "postgres" | "sqlite" | "mssql";
type DatabaseTableKey = keyof IDatabase;

/**
 * * Setting Database Config
 */
dotenv.config();
const env = process.env.NODE_ENV as envType;
const envConfiguration = sequelizeConfig[env];

const sequelize = new Sequelize(
    envConfiguration.database as string,
    envConfiguration.username as string,
    envConfiguration.password as string,
    {
        host: envConfiguration.host,
        dialect: envConfiguration.dialect as dbType,
        retry: {
            // ! Database Call limit
            max: 10
        },
        timezone: "+09:00" //"Asia/Seoul";
    }
);

import Category, { CategoryStatic } from "./category";
import Comment, { CommentStatic } from "./comment";
import Image, { ImageStatic } from "./image";
import Post, { PostStatic } from "./post";
import Tag, { TagStatic } from "./tag";
import User, { UserStatic } from "./user";

const database: IDatabase = {
    User: User(sequelize),
    Category: Category(sequelize),
    Comment: Comment(sequelize),
    Image: Image(sequelize),
    Post: Post(sequelize),
    Tag: Tag(sequelize)
};

Object.keys(database).forEach((modelName, idx: number) => {
    const model = database[modelName as DatabaseTableKey];
    if (model && !(model instanceof Sequelize)) {
        model.connectAssociate(database);
    }
});

database.Sequelize = sequelize;

export default database;
