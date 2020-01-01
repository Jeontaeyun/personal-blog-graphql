import { BuildOptions, DataTypes, Model, Sequelize } from "sequelize";
import { IDatabaseTable } from ".";
import { ICategory } from "@interface/common/Category";
import { TableNameEnum } from "@interface/common/Table";

export type CategoryStatic = typeof Model & {
    new (values?: object, options?: BuildOptions): ICategory;
    connectAssociate: (db: IDatabaseTable) => void;
};

export default (sequelize: Sequelize) => {
    const Category: CategoryStatic = <CategoryStatic>sequelize.define(
        TableNameEnum.CATEGORY,

        {
            /**
             * *Sequelize ID 항목을 UUID(범용 고유 식별자)로 생성하는 방법
             */
            id: {
                primaryKey: true,
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
            },
            name: {
                type: DataTypes.STRING(20),
                allowNull: false,
            },
        },
        {
            tableName: TableNameEnum.CATEGORY,
            underscored: true,
            createdAt: "created",
            updatedAt: "updated_at",
            charset: "utf8",
            collate: "utf8_general_ci",
        },
    );

    Category.connectAssociate = database => {
        database.Category.hasMany(database.Post);
    };
    return Category;
};
