module.exports = (sequelize, DataTypes) => {
	// TABLE NAME : posts
	const Tag = sequelize.define(
		'Tag',
		{
			tag_name: {
				type: DataTypes.STRING(20),
				allowNull: false
			}
		},
		{
			charset: 'utf8',
			collate: 'utf8_general_ci',
			tableName: 'posts'
		}
	);
	Tag.associate = (db) => {};
	return Tag;
};
