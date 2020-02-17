import { ResolverContextType } from "types/services/User";
import Container from "typedi";
import { ReactionService } from "services";

const reactionService = Container.get(ReactionService);

const comments = async (_: any, args: { id: string }, context: ResolverContextType, info: any) => {
    try {
        const { id } = args;
        const obtainedComments = await reactionService.getComments(id);
        return obtainedComments;
    } catch (error) {
        console.error(error);
        return new Error(error);
    }
};

export default {
    comments
};
