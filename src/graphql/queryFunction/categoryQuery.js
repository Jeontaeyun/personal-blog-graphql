const categorys = async (_, args, { db }, info) => {
	try {
		const categorys = await db.Category.findAll();
		return categorys;
	} catch (e) {
		return new Error('데이터 베이스 오류');
	}
};

module.exports = {
	categorys
};
