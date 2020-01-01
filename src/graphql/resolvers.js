const postQuery = require("./queryFunction/postQuery");
const categoryQuery = require("./queryFunction/categoryQuery");
const postMutation = require("./mutationFunction/postMutation");
const userMutation = require("./mutationFunction/userMutation");
const commentMutation = require("./mutationFunction/commentMutation");
const categoryMutation = require("./mutationFunction/categoryMutation");
const likeMutation = require("./mutationFunction/likeMutation");

module.exports = {
    Query: {
        ...postQuery,
        ...categoryQuery,
        user: async (_, { userId }, { db, req }, info) => {
            return await db.User.findOne({ where: { userId } });
        },
    },
    Mutation: {
        ...commentMutation,
        ...userMutation,
        ...postMutation,
        ...likeMutation,
        ...categoryMutation,
    },
};
