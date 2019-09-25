createCategory = async (_, { category_name }, { db, user }, info) => {
	if (!user || !user.grant === 5) return new AuthenticationError('must be ADMIN');
	try {
		const exCategory = await db.Category.findOne({
			where: { name: category_name }
		});
		if (exCategory) return new Error('중복된 카테고리입니다.');
		const newCategory = await db.Category.create({
			name: category_name
		});
		return newCategory.toJSON();
	} catch (e) {
		return new Error('데이터 베이스 오류');
	}
};

updateCategory = async (_, { category_id, category_name }, { db, user }, info) => {
	if (!user || !user.grant === 5) return new AuthenticationError('must be ADMIN');
	try {
		const exCategory = await db.Category.findOne({
			where: { id: category_id }
		});
		if (!exCategory) return new Error('존재하지 않는 카테고리입니다.');
		return await db.Category.update(
			{
				name: category_name
			},
			{
				where: { id: category_id }
			}
		);
	} catch (e) {
		return new Error('데이터 베이스 오류');
	}
};

deleteCategory = async (_, { category_id }, { db, user }, info) => {
	if (!user || !user.grant === 5) return new AuthenticationError('must be ADMIN');
	try {
		const exCategory = await db.Category.findOne({
			where: { id: category_id }
		});
		if (!exCategory) return new Error('존재하지 않는 카테고리입니다.');
		return await db.Category.destroy({
			where: { id: category_id }
		});
	} catch (e) {
		return new Error('데이터 베이스 오류');
	}
};

module.exports = {
	createCategory,
	updateCategory,
	deleteCategory
};
