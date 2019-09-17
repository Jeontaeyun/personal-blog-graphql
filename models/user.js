module.exports = (sequelize, DataTypes) => {
	const User = sequelize.define(
		'User',
		{
			// 테이블명은 users라고 변경된다.
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
			description: {
				type: DataTypes.STRING(20),
				allowNull: true
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
	User.associate = (db) => {};
	return User;
};
