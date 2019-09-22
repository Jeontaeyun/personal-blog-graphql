exports.createComment = async (_, { description, UserId }, { db, user }, info) => {
	if (!user || !user.grant === 5) return null;
	try {
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
