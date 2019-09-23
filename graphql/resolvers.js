const postQuery = require('./queryFunction/postQuery');
const postMutation = require('./mutationFunction/postMutation');
const userMutation = require('./mutationFunction/userMutation');
const commentMutation = require('./mutationFunction/commentMutation');
const likeMutation = require('./mutationFunction/likeMutation');

module.exports = {
	Query: {
		...postQuery,
		user: async (_, { userId }, { db }, info) => await db.User.findOne({ where: { userId } })
	},
	Mutation: {
		...commentMutation,
		...userMutation,
		...postMutation,
		...likeMutation
	}
};
