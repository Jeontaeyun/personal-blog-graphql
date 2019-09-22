const { UserInputError } = require('apollo-server-express');
const bcrypt = require('bcrypt-nodejs');
const { jwtSign } = require('../authentication');

exports.createUser = async (_, { userId, password, nickname, grant }, { db }, info) => {
	try {
		const exUser = await db.User.findOne({ where: { userId } });
		console.log(exUser);
		if (exUser)
			throw new UserInputError('Username is taken', {
				errors: {
					username: 'This username is taken'
				}
			});
		await bcrypt.hash(password, null, null, (e, hashedPassword) => {
			if (e) console.log(e);
			const newUser = db.User.create({
				userId,
				password: hashedPassword,
				nickname,
				grant
			});
			return newUser;
		});
	} catch (e) {
		console.error(e);
	}
};

exports.login = (_, { userId, password }, { db, user }, info) => {};
exports.logout = (_, args, { db, user, logout }, info) => logout();
