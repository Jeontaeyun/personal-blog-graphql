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
const comments = (_, { post_id }, { db }, info) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield db.Post.findOne({ where: { post_id } });
        if (!post)
            return new Error("포스트가 존재하지 않습니다.");
        const obtainedComments = yield db.Comment.findAll({
            where: { PostId: post_id },
            include: [
                {
                    model: db.User,
                    attributes: ["id", "nickname"]
                }
            ],
            order: [["createdAt", "ASC"]]
        });
        return obtainedComments;
    }
    catch (e) {
        return new Error("데이터 베이스 오류");
    }
});
exports.default = {
    comments
};
//# sourceMappingURL=commentQuery.js.map