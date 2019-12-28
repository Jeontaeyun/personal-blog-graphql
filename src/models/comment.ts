import { Model } from "sequelize/types";

export type CommentStatic = typeof Model & {
    connectAssociate: db;
};

export default (sequelize, DataTypes) => {
    // TABLE NAME : comments
    const Comment = sequelize.define(
        "Comment",
        {
            description: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
        },
        {
            charset: "utf8",
            collate: "utf8_general_ci",
            tableName: "comments",
        },
    );
    Comment.associate = db => {
        db.Comment.belongsTo(db.User);
        db.Comment.belongsTo(db.Post);
        db.Comment.belongsTo(db.Comment, { as: "Recommnet" });
    };
    return Comment;
};
