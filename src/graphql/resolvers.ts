/**
 * * Query
 */
import postQuery from "./query/postQuery";
import categoryQuery from "./query/categoryQuery";

/**
 * * Mutation
 */
import postMutation from "./mutation/postMutation";
import userMutation from "./mutation/user";
import commentMutation from "./mutation/commentMutation";
import categoryMutation from "./mutation/categoryMutation";
import likeMutation from "./mutation/likeMutation";
import { ResolverContextType } from "types/services/User";

export default {
    Query: {
        ...postQuery,
        ...categoryQuery,
        user: async (
            _: any,
            { userId }: { userId: string },
            { database, req }: Pick<ResolverContextType, "database" | "req">,
            info: any
        ) => {
            return await database.User.findOne({ where: { userId } });
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
