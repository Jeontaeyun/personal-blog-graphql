module.exports = (sequelize, DataTypes) => {
	// TABLE NAME : posts
	const Post = sequelize.define(
		'Post',
		{
			title: {
				type: DataTypes.STRING(20),
				allowNull: false
			},
			content: {
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
	Post.associate = (db) => {
		db.Post.belongsToMany(db.User, { though: 'Like', as: 'Liker' });
	};
	return Post;
};
