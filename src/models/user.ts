import { Model, BuildOptions, DataTypes, Sequelize } from "sequelize/types";
import { IDatabaseTable } from "models";
import { TableNameEnum } from "interface/common/Table";
import { ITag } from "interface/common/Tag";

export type TagStatic = typeof Model & {
    new (values?: object, options?: BuildOptions): ITag;
    connectAssociate: (db: IDatabaseTable) => void;
};

export default (sequelize: Sequelize) => {
    const User: TagStatic = <TagStatic>sequelize.define(
        TableNameEnum.TAG,
        {
            id: {
                primaryKey: true,
                allowNull: false,
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
            },
            nickname: {
                type: DataTypes.STRING(20),
                allowNull: false,
            },
            userId: {
                type: DataTypes.STRING(20),
                allowNull: false,
                unique: true,
            },
            password: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },
            grant: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
        },
        {
            tableName: TableNameEnum.TAG,
            underscored: true,
            charset: "utf8",
            collate: "utf8_general_ci",
        },
    );
    User.connectAssociate = (database: IDatabaseTable) => {
        database.User.hasMany(database.Post);
        database.User.hasMany(database.Comment);
        database.User.belongsToMany(database.Post, { through: "Like", as: "Liked" });
    };
    return User;
};
