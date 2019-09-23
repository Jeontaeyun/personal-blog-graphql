exports.createLiked = async (_, { post_id }, { db, user }, info) => {
	try {
		const post = await db.Post.findOne({ where: { id: post_id } });
		if (!post) throw new Error('포스트가 존재하지 않습니다.');
		await post.addLiker(user.id);
		return user.id;
	} catch (e) {
		console.error(e);
	}
};

exports.deleteLiked = async (_, { post_id }, { db, user }, info) => {
	if (user)
		try {
			const post = await db.Post.findOne({ where: { id: post_id } });
			if (!post) throw new Error('포스트가 존재하지 않습니다.');
			await post.removeLiker(user.id);
			return user.id;
		} catch (e) {
			console.error(e);
		}
};
