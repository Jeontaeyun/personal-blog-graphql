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
const createLiked = (_, { post_id }, { db, user }, info) => __awaiter(void 0, void 0, void 0, function* () {
    if (!user)
        return new Error("로그인이 필요합니다.");
    try {
        const post = yield db.Post.findOne({
            where: { id: post_id }
        });
        if (!post)
            return new Error("포스트가 존재하지 않습니다.");
        yield post.addLiker(user.id);
        return user.id;
    }
    catch (e) {
        return new Error("데이터 베이스 오류");
    }
});
const deleteLiked = (_, { post_id }, { db, user }, info) => __awaiter(void 0, void 0, void 0, function* () {
    if (!user)
        return new Error("로그인이 필요합니다.");
    try {
        const post = yield db.Post.findOne({
            where: { id: post_id }
        });
        if (!post)
            return new Error("포스트가 존재하지 않습니다.");
        yield post.removeLiker(user.id);
        return user.id;
    }
    catch (e) {
        return new Error("데이터 베이스 오류");
    }
});
exports.default = {
    createLiked,
    deleteLiked
};
//# sourceMappingURL=likeMutation.js.map