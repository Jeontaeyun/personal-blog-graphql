import { ResolverContextType } from "types/services/User";

const categorys = async (_: any, args: any, { db }: ResolverContextType, info: any) => {
    try {
        const obtainedCategorys = await db.Category.findAll();
        return categorys;
    } catch (e) {
        return new Error("데이터 베이스 오류");
    }
};

export default {
    categorys
};
