"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const Table_1 = require("types/common/Table");
exports.default = (sequelize) => {
    const Category = sequelize.define(Table_1.TABLE_NAME.CATEGORY, {
        id: {
            primaryKey: true,
            type: sequelize_1.DataTypes.UUID,
            defaultValue: sequelize_1.DataTypes.UUIDV4
        },
        name: {
            type: sequelize_1.DataTypes.STRING(20),
            allowNull: false
        }
    }, {
        tableName: Table_1.TABLE_NAME.CATEGORY,
        charset: "utf8",
        collate: "utf8_general_ci"
    });
    Category.connectAssociate = (database) => {
        database.Category.hasMany(database.Post);
    };
    return Category;
};
//# sourceMappingURL=category.js.map