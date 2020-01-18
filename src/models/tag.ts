import { Model, BuildOptions, DataTypes, Sequelize } from "sequelize";
import { IDatabaseTable } from ".";
import { TABLE_NAME } from "@interface/common/Table";
import { ITag } from "@interface/common/Tag";

export type TagStatic = typeof Model & {
    new (values?: object, options?: BuildOptions): ITag;
    connectAssociate: (db: IDatabaseTable) => void;
};

export default (sequelize: Sequelize) => {
    const Tag: TagStatic = <TagStatic>sequelize.define(
        TABLE_NAME.TAG,
        {
            id: {
                primaryKey: true,
                allowNull: false,
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4
            },
            name: {
                type: DataTypes.STRING(20),
                allowNull: false
            }
        },
        {
            tableName: TABLE_NAME.TAG,
            charset: "utf8",
            collate: "utf8_general_ci"
        }
    );
    Tag.connectAssociate = (database: IDatabaseTable) => {
        database.Tag.belongsToMany(database.Post, { through: "PostTag" });
    };
    return Tag;
};
