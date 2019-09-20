module.exports = (sequelize, DataTypes) => {
	// TABLE NAME : categorys
	const Category = sequelize.define(
		'Category',
		{
			name: {
				type: DataTypes.STRING(20),
				allowNull: false
			}
		},
		{
			charset: 'utf8',
			collate: 'utf8_general_ci',
			tableName: 'categorys'
		}
	);
	Category.associate = (db) => {};
	return Category;
};
