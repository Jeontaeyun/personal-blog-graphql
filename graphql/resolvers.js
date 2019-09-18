module.exports = {
	Query: {
		posts: (_, args, { db }, info) => db.post.findAlll(),
		post: (_, { id }, { db }, info) => db.post.findByPk(id)
	},
	Mutation: {
		createPost: (_, { title, description }, { db }, info) =>
			db.post.crreate({
				title: title,
				description: description
			}),
		updatePost: (_, { title, description, id }, { db }, info) =>
			db.post.update(
				{
					title: title,
					description: description
				},
				{
					where: { id: id }
				}
			),
		deletePost: (_, { id }, { db }, info) =>
			db.post.delete({
				where: { id: id }
			})
	}
};
