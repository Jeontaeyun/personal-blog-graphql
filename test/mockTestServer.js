// 테스트에는 express가 없어서 mocking을 해주는 코드
const { ApolloServer } = require('apollo-server');
const graphqlConfig = require('../graphql');
const db = require('../models');
const baseContext = {
	req: {
		user: null,
		login: (user, cb) => {
			this.user = user;
			cb();
		},
		logout: () => {
			this.user = null;
		}
	},
	db
};

module.exports = {
	testServer: new ApolloServer({
		...graphqlConfig,
		context: baseContext
	}),
	// For easy access in tests
	baseContext
};
