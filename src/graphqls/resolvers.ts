import postQuery from "./query/post";
import categoryQuery from "./query/category";
import commentQuery from "./query/comment";

import postMutation from "./mutation/post";
import userMutation from "./mutation/user";
import commentMutation from "./mutation/comment";
import categoryMutation from "./mutation/category";
import likeMutation from "./mutation/like";

export default {
    Query: {
        ...postQuery,
        ...categoryQuery,
        ...commentQuery
    },
    Mutation: {
        ...commentMutation,
        ...userMutation,
        ...postMutation,
        ...likeMutation,
        ...categoryMutation
    }
};
