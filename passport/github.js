const passport = require('passport');
const { Strategy: GitHubStrategy } = require('passport-github');
const bcrypt = require('bcrypt-nodejs');
const db = require('../models');

module.exports = () => {
	passport.use(
		new GitHubStrategy(
			{
				clientID: '...',
				clientSecret: '...',
				callbackURL: ' ...'
			},
			(acessToken, refreshToken, profile, cb) => {
				db.User.findOrCreate({ userId: profile.id }, (e, user) => {
					return cb(err, user);
				});
			}
		)
	);
};
