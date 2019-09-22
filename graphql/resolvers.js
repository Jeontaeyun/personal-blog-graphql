const postMutation = require('./mutationFunction/postMutation');
const userMutation = require('./mutationFunction/userMutation');
const commentMutation = require('./mutationFunction/commentMutation');
const { createLiked, deleteLiked } = require('./mutationFunction/likeMutation');

module.exports = {
	Query: {
		posts: async (_, { limit, ord }, { db }, info) => await db.Post.findAll(),
		post: async (_, { id }, { db }, info) => await db.Post.findByPk(id),
		user: async (_, { userId }, { db }, info) => await db.User.findOne({ where: { userId } })
	},
	Mutation: {
		...commentMutation,
		...userMutation,
		...postMutation
	}
};
