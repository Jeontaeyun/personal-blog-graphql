"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const Table_1 = require("types/common/Table");
const User_1 = require("types/common/User");
exports.default = (sequelize) => {
    const User = sequelize.define(Table_1.TABLE_NAME.USER, {
        id: {
            primaryKey: true,
            allowNull: false,
            type: sequelize_1.DataTypes.UUID,
            defaultValue: sequelize_1.DataTypes.UUIDV4
        },
        nickname: {
            type: sequelize_1.DataTypes.STRING(20),
            allowNull: false
        },
        userId: {
            type: sequelize_1.DataTypes.STRING(20),
            allowNull: false,
            unique: true
        },
        password: {
            type: sequelize_1.DataTypes.STRING(100),
            allowNull: false
        },
        grant: {
            type: sequelize_1.DataTypes.ENUM,
            values: Object.values(User_1.USER_GRANT_ENUM),
            allowNull: false
        }
    }, {
        tableName: Table_1.TABLE_NAME.USER,
        charset: "utf8",
        collate: "utf8_general_ci"
    });
    User.connectAssociate = (database) => {
        database.User.hasMany(database.Post);
        database.User.hasMany(database.Comment);
        database.User.belongsToMany(database.Post, { through: "Like", as: "Liked" });
    };
    return User;
};
//# sourceMappingURL=user.js.map