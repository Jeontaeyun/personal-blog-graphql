import { Model, BuildOptions, DataTypes, Sequelize } from "sequelize";
import { IDatabase } from ".";
import { TABLE_NAME } from "types/services/Table";

export interface IImageModel extends Model {
    readonly id: string;
    readonly src: string;
}

export type ImageStatic = typeof Model & {
    new (values?: object, options?: BuildOptions): IImageModel;
    connectAssociate: (db: IDatabase) => void;
};

export default (sequelize: Sequelize) => {
    const Image: ImageStatic = <ImageStatic>sequelize.define(
        TABLE_NAME.IMAGE,
        {
            id: {
                primaryKey: true,
                allowNull: false,
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4
            },
            src: {
                type: DataTypes.STRING(200),
                allowNull: false
            }
        },
        {
            tableName: TABLE_NAME.IMAGE,
            paranoid: true,
            charset: "utf8",
            collate: "utf8_general_ci"
        }
    );
    Image.connectAssociate = (database: IDatabase) => {
        database.Image.belongsTo(database.Post);
    };
    return Image;
};
