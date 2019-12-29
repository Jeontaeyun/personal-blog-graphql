import { Model, BuildOptions, DataTypes, Sequelize } from "sequelize";
import { IDatabaseTable } from ".";
import { TableNameEnum } from "@interface/common/Table";
import { IComment } from "@interface/common/Comment";

export type CommentStatic = typeof Model & {
    new (values?: object, options?: BuildOptions): IComment;
    connectAssociate: (db: IDatabaseTable) => void;
};

export default (sequelize: Sequelize) => {
    const Comment: CommentStatic = <CommentStatic>sequelize.define(
        TableNameEnum.COMMENT,
        {
            id: {
                primaryKey: true,
                allowNull: false,
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
            },
            description: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
        },
        {
            tableName: TableNameEnum.COMMENT,
            underscored: true,
            charset: "utf8",
            collate: "utf8_general_ci",
        },
    );
    Comment.connectAssociate = (database: IDatabaseTable) => {
        database.Comment.belongsTo(database.User);
        database.Comment.belongsTo(database.Post);
        database.Comment.belongsTo(database.Comment, { as: "Recommnet" });
    };
    return Comment;
};
