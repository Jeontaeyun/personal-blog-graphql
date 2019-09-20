const dotenv = require('dotenv');
dotenv.config();

module.exports = {
	development: {
		username: process.env.DB_NAME,
		password: process.env.DB_PASSWORD,
		database: 'blogproject',
		host: 'localhost',
		dialect: 'mysql'
	},
	test: {
		username: process.env.DB_NAME,
		password: process.env.DB_PASSWORD,
		database: 'blogproject',
		host: 'localhost',
		dialect: 'mysql'
	},
	production: {
		username: process.env.DB_NAME,
		password: process.env.DB_PASSWORD,
		database: 'blogproject',
		host: 'localhost',
		dialect: 'mysql'
	}
};
