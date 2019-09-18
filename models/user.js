module.exports = (sequelize, DataTypes) => {
	// TABLE NAME : users
	const User = sequelize.define(
		'User',
		{
			nickname: {
				type: DataTypes.STRING(20),
				allowNull: false
			},
			userId: {
				type: DataTypes.STRING(20),
				allowNull: false,
				unique: true
			},
			password: {
				type: DataTypes.STRING(100),
				allowNull: false
			},
			grant: {
				type: DataTypes.INTEGER,
				allowNUll: true
			}
		},
		{
			charset: 'utf8',
			collate: 'utf8_general_ci',
			tableName: 'users'
		}
	);
	User.associate = (db) => {
		db.User.belongsToMany(db.Post, { though: 'Like', as: 'Liked' });
	};
	return User;
};
