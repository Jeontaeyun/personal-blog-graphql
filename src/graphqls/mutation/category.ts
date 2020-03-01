import { ResolverContextType } from "types/services/User";
import Container from "typedi";
import { ServiceUtils } from "services";
import CategoryService from "services/CategoryService";

const utilService = Container.get(ServiceUtils);
const categoryService = Container.get(CategoryService);

const createCategory = async (_: any, { name }: { name: string }, context: ResolverContextType, info: any) => {
    utilService.checkAdmin(context.user);
    try {
        const newCategory = await categoryService.createCategory(name);
        return newCategory;
    } catch (error) {
        throw new Error("데이터 베이스 오류");
    }
};

const updateCategory = async (_: any, { id, name }: any, context: ResolverContextType, info: any) => {
    utilService.checkAdmin(context.user);
    try {
        const isUpdated = await categoryService.updateCategory(id, name);
        return isUpdated;
    } catch (error) {
        throw new Error("데이터 베이스 오류");
    }
};

const deleteCategory = async (_: any, { id }: any, context: ResolverContextType, info: any) => {
    utilService.checkAdmin(context.user);
    try {
        const isDeleted = await categoryService.deleteCategory(id);
        return isDeleted;
    } catch (error) {
        throw new Error("데이터 베이스 오류");
    }
};

export default {
    createCategory,
    updateCategory,
    deleteCategory
};
