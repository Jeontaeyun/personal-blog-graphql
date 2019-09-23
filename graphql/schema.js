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
        createPost(title: String!, description: String!, UserID: ID!) : Post!
        updatePost(id: ID!, title: String!, description: String!): [Int!]!
        deletePost(id: ID!): Int!
        createComment(description: String, UserId: ID! ) : Comment!
        updateComment(id: ID!, description: String!): [Int!]!
        deleteComment(id: ID!) : Int!
        createLiked(id: ID!) : Int!
        deleteLiked(id: ID!) : Int!
        logout : Boolean
        login: User!
    }
`;
