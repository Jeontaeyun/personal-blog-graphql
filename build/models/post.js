"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const Table_1 = require("types/common/Table");
exports.default = (sequelize) => {
    const Post = sequelize.define(Table_1.TABLE_NAME.POST, {
        id: {
            primaryKey: true,
            allowNull: false,
            type: sequelize_1.DataTypes.UUID,
            defaultValue: sequelize_1.DataTypes.UUIDV4
        },
        title: {
            type: sequelize_1.DataTypes.STRING(20),
            allowNull: false
        },
        description: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: false
        }
    }, {
        tableName: Table_1.TABLE_NAME.POST,
        charset: "utf8",
        collate: "utf8_general_ci"
    });
    Post.connectAssociate = (database) => {
        database.Post.belongsTo(database.User);
        database.Post.belongsTo(database.Category);
        database.Post.hasMany(database.Comment);
        database.Post.hasMany(database.Image);
        database.Post.belongsToMany(database.Tag, { through: "PostTag" });
        database.Post.belongsToMany(database.User, { through: "Like", as: "Liker" });
    };
    return Post;
};
//# sourceMappingURL=post.js.map