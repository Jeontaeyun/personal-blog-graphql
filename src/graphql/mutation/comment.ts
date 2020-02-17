import { ResolverContextType } from "types/services/User";
import Container from "typedi";
import { ServiceUtils, ReactionService } from "services";

const utilService = Container.get(ServiceUtils);
const reactionService = Container.get(ReactionService);

const createComment = async (
    _: any,
    commentInput: { postId: string; description: string },
    context: ResolverContextType,
    info: any
) => {
    await utilService.checkLogined(context.user);
    try {
        const { postId, description } = commentInput;
        const newComment = await reactionService.createComment(postId, { userId: context.user.id, description });
        return newComment;
    } catch (e) {
        return new Error("데이터 베이스 오류");
    }
};
const updateComment = async (
    _: any,
    { comment_id, description }: { comment_id: string; description: string },
    { database, user }: ResolverContextType,
    info: any
) => {
    if (!user) return new Error("로그인이 필요합니다.");
    try {
        const comment = await database.Comment.findOne({
            where: { id: comment_id }
        });
        if (!comment) return new Error("댓글이 존재하지 않습니다.");
        if (comment.get("UserId") !== user.id) return new Error("해당 댓글에 대한 권한이 없습니다.");
        return await database.Comment.update(
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
    { database, user }: ResolverContextType,
    info: any
) => {
    if (!user) return new Error("로그인이 필요합니다.");
    try {
        const comment = await database.Comment.findOne({
            where: { id: comment_id }
        });
        if (!comment) return new Error("댓글이 존재하지 않습니다.");
        if (comment.get("UserId") !== user.id) return new Error("해당 댓글에 대한 권한이 없습니다.");
        return await database.Comment.destroy({
            where: { id: comment_id }
        });
    } catch (e) {
        return new Error("데이터 베이스 오류");
    }
};

const createRecomment = async (
    _: any,
    { post_id, comment_id, description }: { post_id: string; comment_id: string; description: string },
    { database, user }: ResolverContextType,
    info: any
) => {
    if (!user) return new Error("로그인이 필요합니다.");
    try {
        const comment = await database.Comment.findOne({
            where: { id: comment_id }
        });
        if (!comment) return new Error("댓글이 존재하지 않습니다.");
        const newReComment = database.Comment.create({
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
