module.exports = `
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
        UserId: User!
        PostId: Post!
    }

    type Post {
        id: ID!
        title: String!
        user: User!
        description: String!
        createdAt: String!
    }

    type Query{
        posts(limit: Int, ord: String): [Post!]!
        post(id: ID!) : Post
        user(userId: ID!) : User!

    }

    type Mutation {
        createToken(userId: String!, password: String!) : User!
        createUser(userId: String!, password: String!, nickname: String!, grant: Int!) : User!
        createPost(title: String!, description: String!, tag: String!) : Post!
        updatePost(post_id: ID!, title: String!, description: String!): [Int!]!
        deletePost(post_id: ID!): Int!
        createComment(description: String) : Comment!
        updateComment(comment_id: ID!, description: String!): [Int]!
        deleteComment(comment_id: ID!) : Int!
        createLiked(post_id: ID!) : Int!
        deleteLiked(like_id: ID!) : Int!
        logout : Boolean
        login(userId : String!, password: String!): User!
    }
`;
