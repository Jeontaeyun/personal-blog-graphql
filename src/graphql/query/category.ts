import { ResolverContextType } from "types/services/User";
import Container from "typedi";
import CategoryService from "services/CategoryService";

const categoryService = Container.get(CategoryService);

const categorys = async (_: any, args: any, context: ResolverContextType, info: any) => {
    try {
        const obtainedCategorys = await categoryService.getCategorys();
        return obtainedCategorys;
    } catch (error) {
        throw new Error(`데이터 베이스 오류 ${error}`);
    }
};

export default {
    categorys
};
