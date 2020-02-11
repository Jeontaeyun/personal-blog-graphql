import { Sequelize } from "sequelize";
import configuration from "../config";
import dotenv from "dotenv";

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
const envConfiguration = configuration[env];

const sequelize = new Sequelize(
    envConfiguration.database as string,
    envConfiguration.username as string,
    envConfiguration.password as string,
    {
        host: envConfiguration.host,
        dialect: envConfiguration.dialect as dbType,
        logging: true,
        retry: {
            // ! DB 호출 재설정 횟수를 제한할 수 있다.
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
