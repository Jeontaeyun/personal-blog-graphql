exports.createPost = async (_, { UserId, title, description, tag }, { db, user }, info) => {
	if (!user || !user.grant === 5) return null;
	try {
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
};

exports.updatePost = async (_, { title, description, id }, { db }, info) => {
	if (!user || !user.grant === 5) return null;
	await db.Post.update(
		{
			title: title,
			description: description
		},
		{
			where: { id: id }
		}
	);
};

exports.deletePost = async (_, { id }, { db }, info) => {
	if (!user || !user.grant === 5) return null;
	await db.Post.delete({
		where: { id: id }
	});
};
