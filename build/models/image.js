"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const Table_1 = require("types/common/Table");
exports.default = (sequelize) => {
    const Image = sequelize.define(Table_1.TABLE_NAME.IMAGE, {
        id: {
            primaryKey: true,
            allowNull: false,
            type: sequelize_1.DataTypes.UUID,
            defaultValue: sequelize_1.DataTypes.UUIDV4
        },
        src: {
            type: sequelize_1.DataTypes.STRING(200),
            allowNull: false
        }
    }, {
        tableName: Table_1.TABLE_NAME.IMAGE,
        charset: "utf8",
        collate: "utf8_general_ci"
    });
    Image.connectAssociate = (database) => {
        database.Image.belongsTo(database.Post);
    };
    return Image;
};
//# sourceMappingURL=image.js.map