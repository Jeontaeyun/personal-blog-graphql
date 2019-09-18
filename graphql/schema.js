module.exports = `
    type User {
        id: ID!
    }

    type Comment {
        id: ID!
        user: String!
    }

    type Post {
        id: ID!
        title: String!
        description: String!
        created_at: String!
        Comments: [Comment]
    }

    type Query{
        posts: [Post!]!
        post(id: ID!) : Post
    }

    type Mutation {
        createPost(title: String!, content: String!, authorID: ID!) : Post!
        updatePost(id: ID!, title: String!, content: String!): [Int!]!
        deletePost(id: ID!): Int!
    }
`;
