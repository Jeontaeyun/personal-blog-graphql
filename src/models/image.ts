import { Model, BuildOptions, DataTypes, Sequelize } from "sequelize";
import { IDatabaseTable } from ".";
import { TABLE_NAME } from "@interface/common/Table";
import { IImage } from "@interface/common/Image";

export type ImageStatic = typeof Model & {
    new (values?: object, options?: BuildOptions): IImage;
    connectAssociate: (db: IDatabaseTable) => void;
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
            charset: "utf8",
            collate: "utf8_general_ci"
        }
    );
    Image.connectAssociate = (database: IDatabaseTable) => {
        database.Image.belongsTo(database.Post);
    };
    return Image;
};
