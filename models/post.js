module.exports = (sequelize, DataTypes) => {
	const Post = sequelize.define(
		'Post',
		{
			// 테이블명은 users라고 변경된다.
			title: {
				type: DataTypes.STRING(20),
				allowNull: false
			},
			description: {
				type: DataTypes.TEXT,
				allowNull: false
			}
		},
		{
			charset: 'utf8',
			collate: 'utf8_general_ci',
			tableName: 'posts'
		}
	);
	Post.associate = (db) => {};
	return Post;
};
