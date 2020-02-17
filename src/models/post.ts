import { Model, BuildOptions, DataTypes, Sequelize } from "sequelize";
import { IDatabase } from ".";
import { TABLE_NAME } from "types/services/Table";
import { IPost } from "types/services/Post";
import { ITagModel } from "./tag";
import { ICommentModel } from "./comment";

export interface IPostModel extends Model, IPost {
    getTags: () => Promise<any>;
    addTags: (tags: ITagModel[]) => Promise<any>;
    removeTags: (tags: ITagModel[]) => Promise<any>;
    addComment: (comment: ICommentModel) => Promise<any>;
    removeComment: (comment: ICommentModel) => Promise<any>;
}

export type PostStatic = typeof Model & {
    new (values?: object, options?: BuildOptions): IPostModel;
    connectAssociate: (db: IDatabase) => void;
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
            paranoid: true,
            charset: "utf8",
            collate: "utf8_general_ci"
        }
    );
    Post.connectAssociate = (database: IDatabase) => {
        database.Post.belongsTo(database.User);
        database.Post.belongsTo(database.Category);
        database.Post.hasMany(database.Comment);
        database.Post.hasMany(database.Image);
        database.Post.belongsToMany(database.Tag, { through: "PostTag", as: "tags" });
        database.Post.belongsToMany(database.User, { through: "Like", as: "Liker" });
    };
    return Post;
};
