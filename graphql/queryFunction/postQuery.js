const paginate = ({ page, pageSize }) => {
	const offset = page * pageSize;
	const limit = offset + pageSize;
	return {
		offset,
		limit
	};
};

exports.posts = async (_, { limit, ord = 'DESC' }, { db, user }, info) => {
	try {
		if (order !== 'DESC' && order !== 'ASC') {
			return new Error('올바른 정렬을 매개변수를 입력해주세요');
		}
		const posts = await db.Post.findAll({
			order: [ [ 'createdAt', ord ] ],
			include: [
				{
					model: db.User,
					through: 'Like',
					as: 'Liker',
					attributes: [ 'id' ]
				},
				{
					model: db.Category,
					attributes: [ 'id', 'name' ]
				}
			],
			...paginate({})
		});
		return posts.toJSON();
	} catch (e) {
		return new Error('데이터 베이스 오류');
	}
};
exports.post = async (_, { post_id }, { db, user }, info) => {
	try {
		const post = await db.Post.findOne({
			where: { id: post_id },
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
		return post.toJSON();
	} catch (e) {
		return new Error('데이터 베이스 오류');
	}
};
