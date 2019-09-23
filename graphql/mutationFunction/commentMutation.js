exports.createComment = async (_, { post_id, description }, { db, user }, info) => {
	if (!user || !user.grant === 5) return null;
	try {
		const post = await db.Post.findOne({ where: { id: post_id } });
		if (!post) throw Error('포스트가 존재하지 않습니다.');
		const newComment = await db.Comment.create({
			description: description,
			UserId: user.id,
			PostId: post_id
		});
		// 이 부분에서 왜 addComment는 하는데 addUser는 안하는 걸까?
		await post.addComments(newComment.id);
		const comment = await db.Comment.findOne({
			where: { id: newComment.id },
			include: [
				{
					model: db.User,
					attributes: [ 'id', 'nickname' ]
				}
			]
		});
		return comment;
	} catch (e) {
		console.error(e);
	}
};
exports.updateComment = async (_, { comment_id, description }, { db, user }, info) => {
	if (!user || !user.grant === 5) return null;
	try {
		const comment = await db.Comment.findOne({ where: { id: comment_id } });
		if (!comment) throw new Error('댓글이 존재하지 않습니다.');
		const updatedComment = await db.Comment.update(
			{
				description
			},
			{
				where: { id: comment_id }
			}
		);
		return updatedComment;
	} catch (e) {
		console.error(e);
	}
};
exports.deleteComment = async (_, { comment_id }, { db, user }, info) => {
	if (!user || !user.grant === 5) return null;
	try {
		const comment = await db.Comment.findOne({ where: { id: comment_id } });
		if (!comment) throw new Error('댓글이 존재하지 않습니다.');
		await db.Comment.destroy({ where: { id: comment_id } });
		return comment_id;
	} catch (e) {
		console.error(e);
	}
};
