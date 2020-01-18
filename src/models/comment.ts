import { Model, BuildOptions, DataTypes, Sequelize } from "sequelize";
import { IDatabaseTable } from ".";
import { TABLE_NAME } from "@interface/common/Table";
import { IComment } from "@interface/common/Comment";

export type CommentStatic = typeof Model & {
    new (values?: object, options?: BuildOptions): IComment;
    connectAssociate: (db: IDatabaseTable) => void;
};

export default (sequelize: Sequelize) => {
    const Comment: CommentStatic = <CommentStatic>sequelize.define(
        TABLE_NAME.COMMENT,
        {
            id: {
                primaryKey: true,
                allowNull: false,
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4
            },
            description: {
                type: DataTypes.TEXT,
                allowNull: false
            }
        },
        {
            tableName: TABLE_NAME.COMMENT,
            charset: "utf8",
            collate: "utf8_general_ci"
        }
    );
    Comment.connectAssociate = (database: IDatabaseTable) => {
        database.Comment.belongsTo(database.User);
        database.Comment.belongsTo(database.Post);
        database.Comment.belongsTo(database.Comment, { as: "recommnet" });
    };
    return Comment;
};
