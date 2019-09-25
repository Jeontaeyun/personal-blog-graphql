const paginate = ({ page, pageSize }) => {
	const offset = page * pageSize;
	const limit = offset + pageSize;
	return {
		offset,
		limit
	};
};

const posts = async (_, { limit, ord = 'DESC', category_id = 0 }, { db, user }, info) => {
	try {
		let postCondition = {};
		if (ord !== 'DESC' && ord !== 'ASC') {
			return new Error('올바른 정렬을 매개변수를 입력해주세요');
		}
		if (category_id) postCondition = { CategoryId: category_id };
		const posts = await db.Post.findAll({
			where: postCondition,
			order: [ [ 'createdAt', ord ] ],
			include: [
				{
					model: db.User,
					through: 'Like',
					as: 'Liker',
					attributes: [ 'id', 'nickname' ]
				},
				{
					model: db.User,
					attributes: [ 'id', 'nickname' ]
				},
				{
					model: db.Category,
					attributes: [ 'id', 'name' ]
				},
				{
					model: db.Tag,
					through: 'PostTag',
					attributes: [ 'id', 'name' ]
				}
			]
		});
		console.log(posts[0]);
		return posts;
	} catch (e) {
		return new Error('데이터 베이스 오류');
	}
};
const post = async (_, { post_id }, { db, user }, info) => {
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

module.exports = {
	post,
	posts
};
