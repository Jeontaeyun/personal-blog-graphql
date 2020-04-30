import { Model, BuildOptions, DataTypes, Sequelize } from "sequelize";
import { IDatabase } from ".";
import { TABLE_NAME } from "types/services/Table";
import { USER_GRANT_ENUM, PLATFORM } from "types/services/User";

export interface IUserModel extends Model {
    readonly id: string;
    readonly nickname: string;
    readonly userId: string;
    readonly password: string;
    readonly grant: string;
    readonly photoURL?: string;
}

export type UserStatic = typeof Model & {
    new (values?: object, options?: BuildOptions): IUserModel;
    connectAssociate: (db: IDatabase) => void;
};

export default (sequelize: Sequelize) => {
    const User: UserStatic = <UserStatic>sequelize.define(
        TABLE_NAME.USER,
        {
            id: {
                primaryKey: true,
                allowNull: false,
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4
            },
            userId: {
                type: DataTypes.STRING(20),
                allowNull: false,
                unique: true
            },
            name: {
                type: DataTypes.STRING(10),
                allowNull: true,
                defaultValue: "이름없음"
            },
            nickname: {
                type: DataTypes.STRING(20),
                allowNull: false
            },
            photoURL: {
                type: DataTypes.STRING,
                allowNull: true
            },
            email: {
                type: DataTypes.STRING(30),
                allowNull: true
            },
            platform: {
                type: DataTypes.ENUM,
                values: Object.values(PLATFORM)
            },
            password: {
                type: DataTypes.STRING(100),
                allowNull: false
            },
            grant: {
                type: DataTypes.ENUM,
                values: Object.values(USER_GRANT_ENUM),
                allowNull: false
            }
        },
        {
            tableName: TABLE_NAME.USER,
            paranoid: true,
            charset: "utf8",
            collate: "utf8_general_ci"
        }
    );
    User.connectAssociate = (database: IDatabase) => {
        database.User.hasMany(database.Post);
        database.User.hasMany(database.Comment);
        database.User.belongsToMany(database.Post, { through: "Like", as: "Liked" });
    };
    return User;
};
