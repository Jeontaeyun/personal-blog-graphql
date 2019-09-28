const { AuthenticationError } = require('apollo-server-express');

const tagAddFunction = async (newPost, tag, db) => {
	try {
		let tagArr;
		if (tag) {
			tagArr = tag.match(/#[^\s]+/g);
		}
		if (tagArr) {
			const tagResult = await Promise.all(
				tagArr.map(async (tags) => {
					return await db.Tag.findOrCreate({
						where: { name: tags.slice(1).toLowerCase() }
					});
				})
			);
			return await newPost.addTags(tagResult.map((r) => r[0]));
		}
	} catch (e) {
		return new Error('태그 추가 에러');
	}
};

const createPost = async (_, { title, description, tag, category_id }, { db, user }, info) => {
	if (!user || !user.grant === 5) return new AuthenticationError('must be ADMIN');
	try {
		const newPost = await db.Post.create({
			title,
			description,
			UserId: user.id,
			CategoryId: category_id
		});
		await tagAddFunction(newPost, tag, db);
		const post = await db.Post.findOne({
			where: { id: newPost.id },
			include: [
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
					as: 'Tags',
					attributes: [ 'id', 'name' ]
				}
			]
		});
		return post.toJSON();
	} catch (e) {
		return new Error('데이터 베이스 오류');
	}
};

const updatePost = async (_, { post_id, title, description, category_id }, { db, user }, info) => {
	if (!user && user.grant !== 5) return new AuthenticationError('must be ADMIN');
	try {
		return await db.Post.update(
			{
				title: title,
				description: description,
				CategoryId: category_id
			},
			{
				where: { id: post_id }
			}
		);
	} catch (e) {
		return new Error('데이터 베이스 오류');
	}
};

const deletePost = async (_, { post_id }, { db, user }, info) => {
	if (!user && user.grant !== 5) return new AuthenticationError('must be ADMIN');
	try {
		return await db.Post.destroy({
			where: { id: post_id }
		});
	} catch (e) {
		return new Error('데이터 베이스 오류');
	}
};

module.exports = {
	createPost,
	updatePost,
	deletePost
};
