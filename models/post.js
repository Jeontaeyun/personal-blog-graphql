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
		db.Post.belongsTo(db.User);
		db.Post.hasMany(db.Comment);
		db.Post.hasMany(db.Image);
		db.Post.belongsToMany(db.Tag, { through: 'PostTag' });
		db.Post.belongsToMany(db.User, { through: 'Like', as: 'Liker' });
	};
	return Post;
};
