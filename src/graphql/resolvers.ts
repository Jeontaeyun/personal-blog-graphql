/**
 * * Query
 */
import postQuery from "./queryFunction/postQuery";
import categoryQuery from "./queryFunction/categoryQuery";

/**
 * * Mutation
 */
import postMutation from "./mutationFunction/postMutation";
import userMutation from "./mutationFunction/userMutation";
import commentMutation from "./mutationFunction/commentMutation";
import categoryMutation from "./mutationFunction/categoryMutation";
import likeMutation from "./mutationFunction/likeMutation";
import { ResolverContextType } from "types/common/User";

export default {
    Query: {
        ...postQuery,
        ...categoryQuery,
        user: async (
            _: any,
            { userId }: { userId: string },
            { db, req }: Pick<ResolverContextType, "db" | "req">,
            info: any
        ) => {
            return await db.User.findOne({ where: { userId } });
        }
    },
    Mutation: {
        ...commentMutation,
        ...userMutation,
        ...postMutation,
        ...likeMutation,
        ...categoryMutation
    }
};
