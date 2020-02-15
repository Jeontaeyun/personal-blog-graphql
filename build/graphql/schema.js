"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = `
    type User {
        id: ID!
        userId: String!
        nickname: String!
        posts: [Post!]!
        comments: [Comment!]!
        token: String!
        grant: Int!
    }

    type Comment {
        id: ID!
        description: String!
        createdAt: String!
        User: User! 
        PostId: Int!
    }

    type Post {
        id: ID!
        title: String!
        description: String!
        createdAt: String!
        User: User!
        Tags: [Tag!]!
        Category: Category!
        Liker : [User!]!
    }
    type Category{
        id: ID!
        name: String!
    }

    type Tag {
        id: ID!
        name: String!
    }
    type Query{
        posts(limit: Int, ord: String, category_id: Int ): [Post!]!
        post(post_id: ID!) : Post
        user(userId: ID!) : User!
        categorys : [Category!]!
    }

    type Mutation {
        createToken(userId: String!, password: String!) : User!
        createUser(userId: String!, password: String!, nickname: String!, grant: Int!) : User!

        createCategory(category_name: String!) : Category!
        updateCategory(category_id: Int!, category_name: String!) : [Int!]!
        deleteCategory(category_id: Int!): Int!

        createPost(title: String!, description: String!, tag: String!, category_id: ID!) : Post!
        updatePost(post_id: ID!, title: String!, description: String!, tag: String, category_id: ID): [Int!]!
        deletePost(post_id: ID!): Int!

        createComment(post_id: ID! description: String!) : Comment!
        updateComment(comment_id: ID!, description: String!): [Int]!
        deleteComment(comment_id: ID!) : Int!
        
        createRecomment(post_id: ID!, comment_id: ID!, description: String!): Comment!

        createLiked(post_id: ID!) : Int!
        deleteLiked(post_id: ID!) : Int!

        logout : User!
        login(userId : String!, password: String!): User!
    }
`;
//# sourceMappingURL=schema.js.map