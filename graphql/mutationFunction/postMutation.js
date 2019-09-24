exports.createPost = async (_, { title, description, tag }, { db, user }, info) => {
	try {
		let tagArr;
		if (tag) {
			tagArr = tag.match(/#[^\s]+/g);
		}
		const newPost = await db.Post.create({
			title,
			description,
			UserId: 2
		});
		if (tagArr) {
			const tagResult = await Promise.all(
				tagArr.map(async (tags) => {
					return await db.Tag.findOrCreate({ where: { name: tags.slice(1).toLowerCase() } });
				})
			);
			await newPost.addTags(tagResult.map((r) => r[0]));
		}
		return newPost.toJSON();
	} catch (e) {
		console.error(e);
	}
};

exports.updatePost = async (_, { post_id, title, description }, { db, user }, info) => {
	try {
		return await db.Post.update(
			{
				title: title,
				description: description
			},
			{
				where: { id: post_id }
			}
		);
	} catch (e) {
		console.error(e);
	}
};

exports.deletePost = async (_, { post_id }, { db, user }, info) => {
	try {
		return await db.Post.destroy({ where: { id: post_id } });
	} catch (e) {
		console.error(e);
	}
};
