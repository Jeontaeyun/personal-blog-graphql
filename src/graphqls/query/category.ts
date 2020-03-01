import { ResolverContextType } from "types/services/User";
import Container from "typedi";
import CategoryService from "services/CategoryService";

const categoryService = Container.get(CategoryService);

const categorys = async (_: any, args: any, context: ResolverContextType, info: any) => {
    try {
        const obtainedCategorys = await categoryService.getCategorys();
        return obtainedCategorys;
    } catch (error) {
        console.error(error);
        throw new Error(error);
    }
};

export default {
    categorys
};
