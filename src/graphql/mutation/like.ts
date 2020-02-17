import { ResolverContextType } from "types/services/User";
import Container from "typedi";
import { ServiceUtils } from "services";

const utilService = Container.get(ServiceUtils);

const createLiked = async (_: any, { post_id }: { post_id: string }, context: ResolverContextType, info: any) => {
    try {
        utilService.checkLogined(context.user);
        const post = await db.Post.findOne({
            where: { id: post_id }
        });
        if (!post) return new Error("포스트가 존재하지 않습니다.");
        await post.addLiker(user.id);
        return user.id;
    } catch (e) {
        return new Error("데이터 베이스 오류");
    }
};
const deleteLiked = async (_: any, { post_id }: { post_id: string }, { db, user }: ResolverContextType, info: any) => {
    try {
        utilService.checkLogined(context.user);
        const post = await db.Post.findOne({
            where: { id: post_id }
        });
        if (!post) return new Error("포스트가 존재하지 않습니다.");
        await post.removeLiker(user.id);
        return user.id;
    } catch (e) {
        return new Error("데이터 베이스 오류");
    }
};

export default {
    createLiked,
    deleteLiked
};
