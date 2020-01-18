import { USER_GRANT_ENUM, ResolverContextType } from "@interface/common/User";
import { AuthenticationError } from "apollo-server";

const createCategory = async (
    _: any,
    { category_name }: { category_name: string },
    { db, user }: ResolverContextType,
    info: any
) => {
    if (!user || !(user.grant === USER_GRANT_ENUM.ADMIN)) {
        return new AuthenticationError("must be ADMIN");
    }
    try {
        const exCategory = await db.Category.findOne({
            where: { name: category_name }
        });
        if (exCategory) return new Error("중복된 카테고리입니다.");
        const newCategory = await db.Category.create({
            name: category_name
        });
        return newCategory.toJSON();
    } catch (e) {
        return new Error("데이터 베이스 오류");
    }
};

const updateCategory = async (
    _: any,
    { category_id, category_name }: { category_id: string; category_name: string },
    { db, user }: ResolverContextType,
    info: any
) => {
    if (!user || !(user.grant === USER_GRANT_ENUM.ADMIN)) {
        return new AuthenticationError("must be ADMIN");
    }
    try {
        const exCategory = await db.Category.findOne({
            where: { id: category_id }
        });
        if (!exCategory) return new Error("존재하지 않는 카테고리입니다.");
        return await db.Category.update(
            {
                name: category_name
            },
            {
                where: { id: category_id }
            }
        );
    } catch (e) {
        return new Error("데이터 베이스 오류");
    }
};

const deleteCategory = async (
    _: any,
    { category_id }: { category_id: string },
    { db, user }: ResolverContextType,
    info: any
) => {
    if (!user || !(user.grant === USER_GRANT_ENUM.ADMIN)) {
        return new AuthenticationError("must be ADMIN");
    }
    try {
        const exCategory = await db.Category.findOne({
            where: { id: category_id }
        });
        if (!exCategory) return new Error("존재하지 않는 카테고리입니다.");
        return await db.Category.destroy({
            where: { id: category_id }
        });
    } catch (e) {
        return new Error("데이터 베이스 오류");
    }
};

export default {
    createCategory,
    updateCategory,
    deleteCategory
};
