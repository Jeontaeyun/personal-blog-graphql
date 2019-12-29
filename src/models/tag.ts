import { Model, BuildOptions, DataTypes, Sequelize } from "sequelize/types";
import { IDatabaseTable } from "models";
import { TableNameEnum } from "interface/common/Table";
import { ITag } from "interface/common/Tag";

export type TagStatic = typeof Model & {
    new (values?: object, options?: BuildOptions): ITag;
    connectAssociate: (db: IDatabaseTable) => void;
};

export default (sequelize: Sequelize) => {
    const Tag: TagStatic = <TagStatic>sequelize.define(
        TableNameEnum.TAG,
        {
            id: {
                primaryKey: true,
                allowNull: false,
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
            },
            name: {
                type: DataTypes.STRING(20),
                allowNull: false,
            },
        },
        {
            tableName: TableNameEnum.TAG,
            underscored: true,
            charset: "utf8",
            collate: "utf8_general_ci",
        },
    );
    Tag.connectAssociate = (database: IDatabaseTable) => {
        database.Tag.belongsToMany(database.Post, { through: "PostTag" });
    };
    return Tag;
};
