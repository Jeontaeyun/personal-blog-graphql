module.exports = `
    type User {
        id: ID!
        nickname: String!
        posts: [Post!]!
        comments: [Comment!]!
        grant: Int!
    }

    type Comment {
        id: ID!
        description: String!
        createdAt: String!
        user: User!
        post: Post!
    }

    type Post {
        id: ID!
        title: String!
        user: User!
        description: String!
        createdAt: String!
        Comments: [Comment]
    }

    type Query{
        posts(limit: Int, ord: String): [Post!]!
        post(id: ID!) : Post
        user(id: ID!) : User

    }

    type Mutation {
        createUser(UserId: String!, password: String!, nickName: String!, grant: Int!) : User!
        createPost(title: String!, description: String!, UserID: ID!) : Post!
        updatePost(id: ID!, title: String!, description: String!): [Int!]!
        deletePost(id: ID!): Int!
        cretaeComment(description: String, UserId: ID! ) : Comment!
        updateComment(id: ID!, description: String!): [Int!]!
        deleteComment(id: ID!) : Int!
        createLike(id: ID!) : Int!
        deleteLike(id: ID!) : Int!
    }
`;
