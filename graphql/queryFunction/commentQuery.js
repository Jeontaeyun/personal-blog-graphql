exports.comments = async (_, { id }, { db, user }, info) => {
	try {
		const post = await db.Post.findOne({ where: { id } });
		if (!post) throw new Error('포스트가 존재하지 않습니다.');
		const comments = await db.Comment.findAll({
			where: { PostId: id },
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
