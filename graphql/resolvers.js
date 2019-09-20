const bcrypt = require('bcrypt-nodejs');

module.exports = {
	Query: {
		posts: (_, { limit, ord }, { db }, info) => db.Post.findAll(),
		post: (_, { id }, { db }, info) => db.Post.findByPk(id)
	},
	Mutation: {
		createUser: async (_, { UserId, password, nickName, grant }, { db }, info) => {
			try {
				const exUser = db.User.findOne({ where: { UserId } });
				if (exUser) {
					throw "It's already declared";
				}
				await bcrypt.hash(password, null, null, (e, hashedPassword) => {
					if (e) console.log(e);
					const newUser = db.User.create({
						UserId,
						password,
						nickName,
						grant
					});
					return newUser;
				});
			} catch (e) {
				console.error(e);
			}
		},
		createPost: async (_, { UserId, title, description, tag }, { db, user }, info) => {
			try {
				if (!user || !user.grant === 5) return null;
				const tags = tag.match(/#[^\s]+/g);
				const newPost = await db.Post.create({
					UserId,
					title,
					description
				});
				if (tags) {
					const tag = await Promise.all(
						tags.map((tag) => {
							db.Tag.findOrCreate({ where: { name: tag.slice(1).toLowerCase() } });
						})
					);
					await newPost.addPostTags(tag.map((r) => r[0]));
				}
				return newPost;
			} catch (e) {
				console.error(e);
			}
		},
		updatePost: (_, { title, description, id }, { db }, info) => {
			if (!user || !user.grant === 5) return null;
			db.Post.update(
				{
					title: title,
					description: description
				},
				{
					where: { id: id }
				}
			);
		},
		deletePost: (_, { id }, { db }, info) => {
			if (!user || !user.grant === 5) return null;
			db.Post.delete({
				where: { id: id }
			});
		}
	}
};
