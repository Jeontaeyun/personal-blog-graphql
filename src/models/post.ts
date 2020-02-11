import { Model, BuildOptions, DataTypes, Sequelize } from "sequelize";
import { IDatabase } from ".";
import { TABLE_NAME } from "types/common/Table";

export interface IPostModel extends Model {
    readonly id: string;
    readonly title: string;
    readonly description: string;
}

export type PostStatic = typeof Model & {
    new (values?: object, options?: BuildOptions): IPostModel;
    connectAssociate: (db: IDatabase) => void;
    addComment: (string: string) => Promise<any>;
    removeComment: (string: string) => Promise<any>;
};

export default (sequelize: Sequelize) => {
    const Post: PostStatic = <PostStatic>sequelize.define(
        TABLE_NAME.POST,
        {
            id: {
                primaryKey: true,
                allowNull: false,
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4
            },
            title: {
                type: DataTypes.STRING(20),
                allowNull: false
            },
            description: {
                type: DataTypes.TEXT,
                allowNull: false
            }
        },
        {
            tableName: TABLE_NAME.POST,
            charset: "utf8",
            collate: "utf8_general_ci"
        }
    );
    Post.connectAssociate = (database: IDatabase) => {
        database.Post.belongsTo(database.User);
        database.Post.belongsTo(database.Category);
        database.Post.hasMany(database.Comment);
        database.Post.hasMany(database.Image);
        database.Post.belongsToMany(database.Tag, { through: "PostTag" });
        database.Post.belongsToMany(database.User, { through: "Like", as: "Liker" });
    };
    return Post;
};
