module.exports = (sequelize, DataTypes) => {
    // TABLE NAME : comments
    const Image = sequelize.define(
        "Image",
        {
            src: {
                type: DataTypes.STRING(200),
                allowNull: false,
            },
        },
        {
            charset: "utf8",
            collate: "utf8_general_ci",
            tableName: "images",
        },
    );
    Image.associate = db => {
        db.Image.belongsTo(db.Post);
    };
    return Image;
};
