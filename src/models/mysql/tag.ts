import { Model, BuildOptions, DataTypes, Sequelize } from "sequelize";
import { IDatabase } from ".";
import { TABLE_NAME } from "types/services/Table";
import { PostStatic, IPostModel } from "./post";

export interface ITagModel extends Model {
    readonly id: string;
    readonly name: string;
    readonly createdAt: Date;
    readonly updatedAt: Date;
    removePost: (post: IPostModel) => Promise<any>;
    addPost: (post: IPostModel) => Promise<any>;
}

export type TagStatic = typeof Model & {
    new (values?: object, options?: BuildOptions): ITagModel;
    connectAssociate: (db: IDatabase) => void;
};

export default (sequelize: Sequelize) => {
    const Tag: TagStatic = <TagStatic>sequelize.define(
        TABLE_NAME.TAG,
        {
            id: {
                primaryKey: true,
                allowNull: false,
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4
            },
            name: {
                type: DataTypes.STRING(20),
                allowNull: false
            }
        },
        {
            tableName: TABLE_NAME.TAG,
            paranoid: true,
            charset: "utf8",
            collate: "utf8_general_ci"
        }
    );
    Tag.connectAssociate = (database: IDatabase) => {
        database.Tag.belongsToMany(database.Post, { through: "PostTag", as: "post" });
    };
    return Tag;
};
