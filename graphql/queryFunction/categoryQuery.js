exports.categorys = async (_, args, { db }, info) => {
	try {
		const categorys = await db.Comment.findAll();
		return categorys.toJSON();
	} catch (e) {
		return new Error('데이터 베이스 오류');
	}
};
