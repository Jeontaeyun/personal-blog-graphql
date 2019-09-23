exports.createPost = async (_, { title, description, tag }, { db, user }, info) => {
	if (!user || !user.grant === 5) return null;
	try {
		const tagArr = tag.match(/#[^\s]+/g);
		const newPost = await db.Post.create({
			UserId: user.id,
			title,
			description
		});
		if (tagArr) {
			const tagResult = await Promise.all(
				tagArr.map((tags) => {
					db.Tag.findOrCreate({ where: { name: tags.slice(1).toLowerCase() } });
				})
			);
			await newPost.addPostTags(tagResult.map((r) => r[0]));
		}
		return newPost;
	} catch (e) {
		console.error(e);
	}
};

exports.updatePost = async (_, { title, description, id }, { db, user }, info) => {
	if (!user || !user.grant === 5) return null;
	try {
		await db.Post.update(
			{
				title: title,
				description: description
			},
			{
				where: { id: id }
			}
		);
	} catch (e) {
		console.error(e);
	}
};

exports.deletePost = async (_, { id }, { db, user }, info) => {
	if (!user || !user.grant === 5) return null;
	try {
		await db.Post.delete({ where: { id } });
	} catch (e) {
		console.error(e);
	}
};
