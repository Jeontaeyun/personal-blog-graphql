const passport = require('passport');
const db = require('../models');
const local = require('./local');

module.exports = () => {
	passport.serializeUser((user, done) => {
		return done(null, user.id);
	});
	passport.deserializeUser(async (id, done) => {
		try {
			const user = await db.User.findOne({
				where: { id }
			});
			return done(null, user);
		} catch (e) {
			console.error(e);
			return done(e);
		}
	});
	local();
};
