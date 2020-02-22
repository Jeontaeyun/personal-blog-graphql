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
    } catch (error) {
        console.error(error);
        throw new Error(error);
    }
};
const updateComment = async (
    _: any,
    data: { commentId: string; description: string },
    context: ResolverContextType,
    info: any
) => {
    await utilService.checkLogined(context.user);
    try {
        const { commentId, description } = data;
        const { user } = context;
        const isUpdated = await reactionService.updateComment(commentId, { userId: user.id, description });
        return isUpdated;
    } catch (error) {
        console.error(error);
        throw new Error(error);
    }
};
const deleteComment = async (_: any, data: { commentId: string }, context: ResolverContextType, info: any) => {
    await utilService.checkLogined(context.user);
    try {
        const { commentId } = data;
        const { user } = context;
        const isDeleted = await reactionService.deleteComment(commentId, user.id);
        return isDeleted;
    } catch (error) {
        console.error(error);
        throw new Error(error);
    }
};

const createRecomment = async (
    _: any,
    data: { postId: string; commentId: string; description: string },
    context: ResolverContextType,
    info: any
) => {
    await utilService.checkLogined(context.user);
    try {
        return true;
    } catch (error) {
        console.error(error);
        throw new Error(error);
    }
};

export default {
    createComment,
    updateComment,
    deleteComment,
    createRecomment
};
