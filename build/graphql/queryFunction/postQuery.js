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
const paginate = ({ page, pageSize }) => {
    const offset = page * pageSize;
    const limit = offset + pageSize;
    return {
        offset,
        limit
    };
};
const posts = (_, { limit, ord = "DESC", category_id }, { db, user }, info) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let postCondition = {};
        if (ord !== "DESC" && ord !== "ASC") {
            return new Error("올바른 정렬을 매개변수를 입력해주세요");
        }
        if (category_id) {
            postCondition = { CategoryId: category_id };
        }
        const obtainedPosts = yield db.Post.findAll({
            where: postCondition,
            order: [["createdAt", ord]],
            include: [
                {
                    model: db.User,
                    through: "Like",
                    as: "Liker",
                    attributes: ["id", "nickname"]
                },
                {
                    model: db.User,
                    attributes: ["id", "nickname"]
                },
                {
                    model: db.Category,
                    attributes: ["id", "name"]
                },
                {
                    model: db.Tag,
                    through: "PostTag",
                    as: "Tags",
                    attributes: ["id", "name"]
                }
            ]
        });
        return obtainedPosts;
    }
    catch (e) {
        return new Error("데이터 베이스 오류");
    }
});
const post = (_, { post_id }, { db, user }, info) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const obtainedPost = yield db.Post.findOne({
            where: { id: post_id },
            include: [
                {
                    model: db.User,
                    attributes: ["id", "nickname"]
                },
                {
                    model: db.Category,
                    attributes: ["id", "name"]
                },
                {
                    model: db.Tag,
                    through: "PostTag",
                    as: "Tags",
                    attributes: ["id", "name"]
                },
                {
                    model: db.User,
                    through: "Like",
                    as: "Liker",
                    attributes: ["id"]
                }
            ]
        });
        if (!post) {
            return new Error("포스트가 존재하지 않습니다.");
        }
        return obtainedPost.toJSON();
    }
    catch (e) {
        return new Error("데이터 베이스 오류");
    }
});
exports.default = {
    post,
    posts
};
//# sourceMappingURL=postQuery.js.map