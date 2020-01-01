import { Model, BuildOptions, DataTypes, Sequelize } from "sequelize";
import { IDatabaseTable } from ".";
import { TableNameEnum } from "@interface/common/Table";
import { IUser } from "@interface/common/User";

export type UserStatic = typeof Model & {
    new (values?: object, options?: BuildOptions): IUser;
    connectAssociate: (db: IDatabaseTable) => void;
};

export default (sequelize: Sequelize) => {
    const User: UserStatic = <UserStatic>sequelize.define(
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
