import { ResolverContextType } from "types/common/User";

const createLiked = async (_: any, { post_id }: { post_id: string }, { db, user }: ResolverContextType, info: any) => {
    if (!user) return new Error("로그인이 필요합니다.");
    try {
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
    if (!user) return new Error("로그인이 필요합니다.");
    try {
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
