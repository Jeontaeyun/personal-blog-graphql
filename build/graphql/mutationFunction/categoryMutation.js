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
const apollo_server_1 = require("apollo-server");
const createCategory = (_, { category_name }, { db, user }, info) => __awaiter(void 0, void 0, void 0, function* () {
    if (!user || !(user.grant === User_1.USER_GRANT_ENUM.ADMIN)) {
        return new apollo_server_1.AuthenticationError("must be ADMIN");
    }
    try {
        const exCategory = yield db.Category.findOne({
            where: { name: category_name }
        });
        if (exCategory)
            return new Error("중복된 카테고리입니다.");
        const newCategory = yield db.Category.create({
            name: category_name
        });
        return newCategory.toJSON();
    }
    catch (e) {
        return new Error("데이터 베이스 오류");
    }
});
const updateCategory = (_, { category_id, category_name }, { db, user }, info) => __awaiter(void 0, void 0, void 0, function* () {
    if (!user || !(user.grant === User_1.USER_GRANT_ENUM.ADMIN)) {
        return new apollo_server_1.AuthenticationError("must be ADMIN");
    }
    try {
        const exCategory = yield db.Category.findOne({
            where: { id: category_id }
        });
        if (!exCategory)
            return new Error("존재하지 않는 카테고리입니다.");
        return yield db.Category.update({
            name: category_name
        }, {
            where: { id: category_id }
        });
    }
    catch (e) {
        return new Error("데이터 베이스 오류");
    }
});
const deleteCategory = (_, { category_id }, { db, user }, info) => __awaiter(void 0, void 0, void 0, function* () {
    if (!user || !(user.grant === User_1.USER_GRANT_ENUM.ADMIN)) {
        return new apollo_server_1.AuthenticationError("must be ADMIN");
    }
    try {
        const exCategory = yield db.Category.findOne({
            where: { id: category_id }
        });
        if (!exCategory)
            return new Error("존재하지 않는 카테고리입니다.");
        return yield db.Category.destroy({
            where: { id: category_id }
        });
    }
    catch (e) {
        return new Error("데이터 베이스 오류");
    }
});
exports.default = {
    createCategory,
    updateCategory,
    deleteCategory
};
//# sourceMappingURL=categoryMutation.js.map