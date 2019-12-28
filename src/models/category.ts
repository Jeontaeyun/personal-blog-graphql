import { Sequelize, DataTypes } from "sequelize";

export default (sequelize: Sequelize) => {
    const Category = sequelize.define(
        "Category",
        {
            name: {
                type: DataTypes.STRING(20),
                allowNull: false,
            },
        },
        {
            charset: "utf8",
            collate: "utf8_general_ci",
            tableName: "categorys",
        },
    );
    Category.associate = db => {
        db.Category.hasMany(db.Post);
    };
    return Category;
};
