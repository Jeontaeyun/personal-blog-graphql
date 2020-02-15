"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const Table_1 = require("types/common/Table");
exports.default = (sequelize) => {
    const Tag = sequelize.define(Table_1.TABLE_NAME.TAG, {
        id: {
            primaryKey: true,
            allowNull: false,
            type: sequelize_1.DataTypes.UUID,
            defaultValue: sequelize_1.DataTypes.UUIDV4
        },
        name: {
            type: sequelize_1.DataTypes.STRING(20),
            allowNull: false
        }
    }, {
        tableName: Table_1.TABLE_NAME.TAG,
        charset: "utf8",
        collate: "utf8_general_ci"
    });
    Tag.connectAssociate = (database) => {
        database.Tag.belongsToMany(database.Post, { through: "PostTag" });
    };
    return Tag;
};
//# sourceMappingURL=tag.js.map