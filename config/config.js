const dotenv = require('dotenv');
dotenv.config();

module.exports = {
	development: {
		username: process.env.DB_NAME,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_DATABASE,
		host: 'localhost',
		dialect: 'mysql'
	},
	test: {
		username: process.env.DB_NAME,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_DATABASE,
		host: 'localhost',
		dialect: 'mysql'
	},
	production: {
		username: process.env.DB_NAME,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_DATABASE,
		host: 'localhost',
		dialect: 'mysql'
	}
};
