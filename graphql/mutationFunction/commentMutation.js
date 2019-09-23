exports.createComment = async (_, { id, description }, { db, user }, info) => {
	if (!user || !user.grant === 5) return null;
	try {
		const post = await db.Post.findOne({ where: { id } });
		if (!post) throw Error('포스트가 존재하지 않습니다.');
		const newComment = await db.Comment.create({
			description: description,
			UserId: user.id,
			PostId: id
		});
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
exports.updateComment = async (_, { id, description }, { db, user }, info) => {
	if (!user || !user.grant === 5) return null;
	try {
	} catch (e) {
		console.error(e);
	}
};
exports.deleteComment = async (_, { id }, { db, user }, info) => {
	if (!user || !user.grant === 5) return null;
	try {
	} catch (e) {
		console.error(e);
	}
};
