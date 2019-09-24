module.exports = (sequelize, DataTypes) => {
	// TABLE NAME : tags
	const Tag = sequelize.define(
		'Tag',
		{
			name: {
				type: DataTypes.STRING(20),
				allowNull: false
			}
		},
		{
			charset: 'utf8',
			collate: 'utf8_general_ci',
			tableName: 'tags'
		}
	);
	Tag.associate = (db) => {
		db.Tag.belongsToMany(db.Post, { through: 'PostTag' });
	};
	return Tag;
};
