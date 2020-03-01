import { ResolverContextType } from "types/services/User";
import Container from "typedi";
import { ServiceUtils, ReactionService } from "services";

const utilService = Container.get(ServiceUtils);
const reactionService = Container.get(ReactionService);

const createLiked = async (_: any, data: { postId: string }, context: ResolverContextType, info: any) => {
    try {
        utilService.checkLogined(context.user);
        const { user } = context;
        const { postId } = data;
        const isCreated = reactionService.createLike(postId, user.id);
        return isCreated;
    } catch (error) {
        console.error(error);
        throw new Error(error);
    }
};
const deleteLiked = async (_: any, data: { postId: string }, context: ResolverContextType, info: any) => {
    try {
        utilService.checkLogined(context.user);
        const { user } = context;
        const { postId } = data;
        const isDeleted = reactionService.deleteLike(postId, user.id);
        return isDeleted;
    } catch (error) {
        console.error(error);
        throw new Error(error);
    }
};

export default {
    createLiked,
    deleteLiked
};
