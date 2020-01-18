import { ResolverContextType } from "@interface/common/User";

const createComment = async (
    _: any,
    { post_id, description }: { post_id: string; description: string },
    { db, user }: ResolverContextType,
    info: any
) => {
    if (!user) return new Error("로그인이 필요합니다.");
    try {
        const post = await db.Post.findOne({
            where: { id: post_id }
        });
        if (!post) return new Error("포스트가 존재하지 않습니다.");
        const newComment = await db.Comment.create({
            description: description,
            UserId: user.id,
            PostId: post_id
        });
        await post.addComment(newComment.get("id"));
        const comment = await db.Comment.findOne({
            where: { id: newComment.get("id") as string },
            include: [
                {
                    model: db.User,
                    attributes: ["id", "nickname"]
                }
            ]
        });
        return comment;
    } catch (e) {
        return new Error("데이터 베이스 오류");
    }
};
const updateComment = async (
    _: any,
    { comment_id, description }: { comment_id: string; description: string },
    { db, user }: ResolverContextType,
    info: any
) => {
    if (!user) return new Error("로그인이 필요합니다.");
    try {
        const comment = await db.Comment.findOne({
            where: { id: comment_id }
        });
        if (!comment) return new Error("댓글이 존재하지 않습니다.");
        if (comment.get("UserId") !== user.id) return new Error("해당 댓글에 대한 권한이 없습니다.");
        return await db.Comment.update(
            {
                description
            },
            {
                where: { id: comment_id }
            }
        );
    } catch (e) {
        return new Error("데이터 베이스 오류");
    }
};
const deleteComment = async (
    _: any,
    { comment_id }: { comment_id: string },
    { db, user }: ResolverContextType,
    info: any
) => {
    if (!user) return new Error("로그인이 필요합니다.");
    try {
        const comment = await db.Comment.findOne({
            where: { id: comment_id }
        });
        if (!comment) return new Error("댓글이 존재하지 않습니다.");
        if (comment.get("UserId") !== user.id) return new Error("해당 댓글에 대한 권한이 없습니다.");
        return await db.Comment.destroy({
            where: { id: comment_id }
        });
    } catch (e) {
        return new Error("데이터 베이스 오류");
    }
};

const createRecomment = async (
    _: any,
    { post_id, comment_id, description }: { post_id: string; comment_id: string; description: string },
    { db, user }: ResolverContextType,
    info: any
) => {
    if (!user) return new Error("로그인이 필요합니다.");
    try {
        const comment = await db.Comment.findOne({
            where: { id: comment_id }
        });
        if (!comment) return new Error("댓글이 존재하지 않습니다.");
        const newReComment = db.Comment.create({
            description: description,
            UserId: user.id,
            PostId: post_id,
            RecommentId: comment_id
        });
        return newReComment;
    } catch (e) {
        return new Error("데이터 베이스 오류");
    }
};

export default {
    createComment,
    updateComment,
    deleteComment,
    createRecomment
};
