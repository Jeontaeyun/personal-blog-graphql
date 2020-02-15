import { Model, BuildOptions, DataTypes, Sequelize } from "sequelize";
import { IDatabase } from ".";
import { TABLE_NAME } from "types/services/Table";

export interface ICommentModel extends Model {
    readonly id: string;
    readonly description: string;
}

export type CommentStatic = typeof Model & {
    new (values?: object, options?: BuildOptions): ICommentModel;
    connectAssociate: (db: IDatabase) => void;
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
            paranoid: true,
            charset: "utf8",
            collate: "utf8_general_ci"
        }
    );
    Comment.connectAssociate = (database: IDatabase) => {
        database.Comment.belongsTo(database.User);
        database.Comment.belongsTo(database.Post);
        database.Comment.belongsTo(database.Comment, { as: "recommnet" });
    };
    return Comment;
};
