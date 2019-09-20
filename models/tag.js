module.exports = (sequelize, DataTypes) => {
	// TABLE NAME : posts
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
		// N:M의 관계는 중간관계를 정의하는 테이블을 through를 통해 제공해주어야한다.
		db.Tag.belongsToMany(db.Post, { through: 'PostTag' });
	};
	return Tag;
};
