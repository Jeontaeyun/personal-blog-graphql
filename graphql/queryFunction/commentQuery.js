exports.comments = async (_, { post_id }, { db }, info) => {
	try {
		const post = await db.Post.findOne({ where: { post_id } });
		if (!post) return new Error('포스트가 존재하지 않습니다.');
		const comments = await db.Comment.findAll({
			where: { PostId: post_id },
			include: [
				{
					model: db.User,
					attributes: [ 'id', 'nickname' ]
				}
			],
			order: [ [ 'createdAt', 'ASC' ] ]
		});
		return comments;
	} catch (e) {
		console.error(e);
	}
};
