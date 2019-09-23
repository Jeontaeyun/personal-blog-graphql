exports.posts = async (_, { limit, ord }, { db, user }, info) => await db.Post.findAll();
exports.post = async (_, { id }, { db, user }, info) => {
	try {
		const post = await db.Post.findOne({
			where: { id },
			include: [
				{
					model: db.User,
					through: 'Like',
					as: 'Liker',
					attributes: [ 'id' ]
				}
			]
		});
		if (!post) throw new Error('포스트가 존재하지 않습니다.');
		return post;
	} catch (e) {
		console.error(e);
	}
};
