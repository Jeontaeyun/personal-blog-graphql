import { Model, BuildOptions, DataTypes, Sequelize } from "sequelize";
import { IDatabase } from ".";
import { TABLE_NAME } from "types/common/Table";
import { USER_GRANT_ENUM } from "types/common/User";

export interface IUserModel extends Model {
    readonly id: string;
    readonly nickname: string;
    readonly userId: string;
    readonly password: string;
    readonly grant: string;
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
            nickname: {
                type: DataTypes.STRING(20),
                allowNull: false
            },
            userId: {
                type: DataTypes.STRING(20),
                allowNull: false,
                unique: true
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
