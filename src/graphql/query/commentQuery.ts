import { ResolverContextType } from "types/services/User";

const comments = async (_: any, { post_id }: { post_id: string }, { db }: ResolverContextType, info: any) => {
    try {
        const post = await db.Post.findOne({ where: { post_id } });
        if (!post) return new Error("포스트가 존재하지 않습니다.");
        const obtainedComments = await db.Comment.findAll({
            where: { PostId: post_id },
            include: [
                {
                    model: db.User,
                    attributes: ["id", "nickname"]
                }
            ],
            order: [["createdAt", "ASC"]]
        });
        return obtainedComments;
    } catch (e) {
        return new Error("데이터 베이스 오류");
    }
};

export default {
    comments
};
