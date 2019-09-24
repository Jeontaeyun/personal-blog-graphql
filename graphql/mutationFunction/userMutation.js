const { UserInputError } = require('apollo-server-express');
const bcrypt = require('bcrypt-nodejs');
const passport = require('passport');
const passportConfig = require('../../passport');

passportConfig();

const loginFunction = async (userId, password, req) => {
	return await new Promise((resolve, reject) => {
		passport.authenticate('local', (e, user, info) => {
			// Server Error
			if (e) {
				reject(e);
				throw e;
			}
			// Logic Error
			if (info) throw info.reason;
			// No user
			if (!user) {
				reject(new Error('유저가 존재하지 않습니다.'));
				throw new Error('유저가 존재하지 않습니다.');
			}
			// req.login is to establish a session and send a response
			req.login(user, (loginError) => {
				if (loginError) throw loginError;
				resolve(user.toJSON());
			});
		})({ body: { userId, password } });
	});
};

exports.createUser = async (_, { userId, password, nickname, grant }, { db }, info) => {
	try {
		const exUser = await db.User.findOne({ where: { userId } });
		if (exUser)
			throw new UserInputError('Username is taken', {
				errors: {
					username: 'This username is taken'
				}
			});
		const hashingUser = new Promise((resolve, reject) => {
			// bcrypt can't use async/await
			bcrypt.hash(password, null, null, async (e, hashedPassword) => {
				if (e) reject(e);
				const newUser = await db.User.create({
					userId,
					password: hashedPassword,
					nickname,
					grant
				});
				return resolve(newUser.toJSON());
			});
		});
		return await hashingUser;
	} catch (e) {
		console.error(e);
	}
};

exports.login = async (_, { userId, password }, { req }, info) => {
	const user = await loginFunction(userId, password, req);
	return user;
};
exports.logout = (_, args, { user, req }, info) => {
	const logoutedUser = user;
	req.logout();
	return logoutedUser;
};
