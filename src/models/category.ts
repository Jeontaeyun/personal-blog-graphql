import { BuildOptions, DataTypes, Model, Sequelize } from "sequelize";
import { IDatabase } from ".";
import { TABLE_NAME } from "types/common/Table";

export interface ICategoryModel extends Model {
    readonly id: string;
    readonly name: string;
}

export type CategoryStatic = typeof Model & {
    new (values?: object, options?: BuildOptions): ICategoryModel;
    connectAssociate: (db: IDatabase) => void;
};

export default (sequelize: Sequelize) => {
    const Category: CategoryStatic = <CategoryStatic>sequelize.define(
        TABLE_NAME.CATEGORY,

        {
            id: {
                primaryKey: true,
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4
            },
            name: {
                type: DataTypes.STRING(20),
                allowNull: false
            }
        },
        {
            tableName: TABLE_NAME.CATEGORY,
            charset: "utf8",
            collate: "utf8_general_ci"
        }
    );

    Category.connectAssociate = (database: IDatabase) => {
        database.Category.hasMany(database.Post);
    };
    return Category;
};
