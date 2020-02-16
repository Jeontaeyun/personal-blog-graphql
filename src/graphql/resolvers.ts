import postQuery from "./query/post";
import categoryQuery from "./query/category";

import postMutation from "./mutation/post";
import userMutation from "./mutation/user";
import commentMutation from "./mutation/comment";
import categoryMutation from "./mutation/category";
import likeMutation from "./mutation/like";
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
