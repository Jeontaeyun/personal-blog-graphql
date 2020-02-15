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
const User_1 = require("types/common/User");
const { AuthenticationError } = require("apollo-server-express");
const tagAddFunction = (newPost, tag, db) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let tagArr;
        if (tag) {
            tagArr = tag.match(/#[^\s]+/g);
        }
        if (tagArr) {
            const tagResult = yield Promise.all(tagArr.map((tags) => __awaiter(void 0, void 0, void 0, function* () {
                return yield db.Tag.findOrCreate({
                    where: { name: tags.slice(1).toLowerCase() }
                });
            })));
            return yield newPost.addTags(tagResult.map(r => r[0]));
        }
    }
    catch (e) {
        return new Error("태그 추가 에러");
    }
});
const tagRemoveFunction = (post, db) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return db.Tag.removePost(post.id);
    }
    catch (e) {
        return new Error("태그 삭제 에러");
    }
});
const createPost = (_, { title, description, tag, category_id }, { db, user }, info) => __awaiter(void 0, void 0, void 0, function* () {
    if (!user || !(user.grant === User_1.USER_GRANT_ENUM.ADMIN)) {
        return new AuthenticationError("must be ADMIN");
    }
    try {
        const newPost = yield db.Post.create({
            title,
            description,
            UserId: user.id,
            CategoryId: category_id
        });
        yield tagAddFunction(newPost, tag, db);
        const post = yield db.Post.findOne({
            where: { id: newPost.get("id") },
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
                }
            ]
        });
        return post.toJSON();
    }
    catch (e) {
        return new Error("데이터 베이스 오류");
    }
});
const updatePost = (_, { post_id, title, description, tag, category_id }, { db, user }, info) => __awaiter(void 0, void 0, void 0, function* () {
    if (!user || !(user.grant === User_1.USER_GRANT_ENUM.ADMIN)) {
        return new AuthenticationError("must be ADMIN");
    }
    const post = yield db.Post.findOne({
        where: { id: post_id }
    });
    if (!post)
        return new Error("포스트가 존재하지 않습니다.");
    if (tag) {
        yield tagRemoveFunction(post, db);
        yield tagAddFunction(post, tag, db);
    }
    try {
        return yield db.Post.update({
            title: title,
            description: description,
            CategoryId: category_id
        }, {
            where: { id: post_id }
        });
    }
    catch (e) {
        return new Error("데이터 베이스 오류");
    }
});
const deletePost = (_, { post_id }, { db, user }, info) => __awaiter(void 0, void 0, void 0, function* () {
    if (!user || !(user.grant === User_1.USER_GRANT_ENUM.ADMIN)) {
        return new AuthenticationError("must be ADMIN");
    }
    try {
        const post = yield db.Post.findOne({
            where: { id: post_id }
        });
        if (!post)
            return new Error("포스트가 존재하지 않습니다.");
        return yield db.Post.destroy({
            where: { id: post_id }
        });
    }
    catch (e) {
        return new Error("데이터 베이스 오류");
    }
});
exports.default = { createPost, updatePost, deletePost };
//# sourceMappingURL=postMutation.js.map