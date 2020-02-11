"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const Table_1 = require("types/common/Table");
exports.default = (sequelize) => {
    const Comment = sequelize.define(Table_1.TABLE_NAME.COMMENT, {
        id: {
            primaryKey: true,
            allowNull: false,
            type: sequelize_1.DataTypes.UUID,
            defaultValue: sequelize_1.DataTypes.UUIDV4
        },
        description: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: false
        }
    }, {
        tableName: Table_1.TABLE_NAME.COMMENT,
        charset: "utf8",
        collate: "utf8_general_ci"
    });
    Comment.connectAssociate = (database) => {
        database.Comment.belongsTo(database.User);
        database.Comment.belongsTo(database.Post);
        database.Comment.belongsTo(database.Comment, { as: "recommnet" });
    };
    return Comment;
};
//# sourceMappingURL=comment.js.map