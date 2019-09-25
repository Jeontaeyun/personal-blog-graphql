const { AuthenticationError } = require('apollo-server-express');

tagAddFunction = async (newPost, tag, db) => {
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

createPost = async (_, { title, description, tag }, { db, user }, info) => {
	if (!user || !user.grant === 5) return new AuthenticationError('must be ADMIN');
	try {
		const newPost = await db.Post.create({
			title,
			description,
			UserId: user.id
		});
		tagAddFunction(newPost, tag, db);
		return newPost.toJSON();
	} catch (e) {
		return new Error('데이터 베이스 오류');
	}
};

updatePost = async (_, { post_id, title, description }, { db, user }, info) => {
	if (!user && user.grant !== 5) return new AuthenticationError('must be ADMIN');
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
		return new Error('데이터 베이스 오류');
	}
};

deletePost = async (_, { post_id }, { db, user }, info) => {
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
