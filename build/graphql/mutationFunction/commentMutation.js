"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const createComment = (_, { post_id, description }, { db, user }, info) => __awaiter(void 0, void 0, void 0, function* () {
    if (!user)
        return new Error("로그인이 필요합니다.");
    try {
        const post = yield db.Post.findOne({
            where: { id: post_id }
        });
        if (!post)
            return new Error("포스트가 존재하지 않습니다.");
        const newComment = yield db.Comment.create({
            description: description,
            UserId: user.id,
            PostId: post_id
        });
        yield post.addComment(newComment.get("id"));
        const comment = yield db.Comment.findOne({
            where: { id: newComment.get("id") },
            include: [
                {
                    model: db.User,
                    attributes: ["id", "nickname"]
                }
            ]
        });
        return comment;
    }
    catch (e) {
        return new Error("데이터 베이스 오류");
    }
});
const updateComment = (_, { comment_id, description }, { db, user }, info) => __awaiter(void 0, void 0, void 0, function* () {
    if (!user)
        return new Error("로그인이 필요합니다.");
    try {
        const comment = yield db.Comment.findOne({
            where: { id: comment_id }
        });
        if (!comment)
            return new Error("댓글이 존재하지 않습니다.");
        if (comment.get("UserId") !== user.id)
            return new Error("해당 댓글에 대한 권한이 없습니다.");
        return yield db.Comment.update({
            description
        }, {
            where: { id: comment_id }
        });
    }
    catch (e) {
        return new Error("데이터 베이스 오류");
    }
});
const deleteComment = (_, { comment_id }, { db, user }, info) => __awaiter(void 0, void 0, void 0, function* () {
    if (!user)
        return new Error("로그인이 필요합니다.");
    try {
        const comment = yield db.Comment.findOne({
            where: { id: comment_id }
        });
        if (!comment)
            return new Error("댓글이 존재하지 않습니다.");
        if (comment.get("UserId") !== user.id)
            return new Error("해당 댓글에 대한 권한이 없습니다.");
        return yield db.Comment.destroy({
            where: { id: comment_id }
        });
    }
    catch (e) {
        return new Error("데이터 베이스 오류");
    }
});
const createRecomment = (_, { post_id, comment_id, description }, { db, user }, info) => __awaiter(void 0, void 0, void 0, function* () {
    if (!user)
        return new Error("로그인이 필요합니다.");
    try {
        const comment = yield db.Comment.findOne({
            where: { id: comment_id }
        });
        if (!comment)
            return new Error("댓글이 존재하지 않습니다.");
        const newReComment = db.Comment.create({
            description: description,
            UserId: user.id,
            PostId: post_id,
            RecommentId: comment_id
        });
        return newReComment;
    }
    catch (e) {
        return new Error("데이터 베이스 오류");
    }
});
exports.default = {
    createComment,
    updateComment,
    deleteComment,
    createRecomment
};
//# sourceMappingURL=commentMutation.js.map