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
        User: User! 
        PostId: Int!
    }

    type Post {
        id: ID!
        title: String!
        User: User!
        Category: Category!
        description: String!
        createdAt: String!
    }
    type Category{
        id: ID!
        name: String!
    }
    type Query{
        posts(limit: Int, ord: String): [Post!]!
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

        createPost(title: String!, description: String!, tag: String!) : Post!
        updatePost(post_id: ID!, title: String!, description: String!): [Int!]!
        deletePost(post_id: ID!): Int!

        createComment(post_id: ID! description: String!) : Comment!
        updateComment(comment_id: ID!, description: String!): [Int]!
        deleteComment(comment_id: ID!) : Int!

        createLiked(post_id: ID!) : Int!
        deleteLiked(post_id: ID!) : Int!
        
        logout : User!
        login(userId : String!, password: String!): User!
    }
`;
