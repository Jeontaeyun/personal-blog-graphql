const { testServer } = require("./mockTestServer");
const { gql } = require("apollo-server-express");
const { createTestClient } = require("apollo-server-testing");
const dotenv = require("dotenv");
dotenv.config();

const { query, mutate } = createTestClient(testServer);

const testUser = {
    id: 0,
    userId: "tes53",
    password: process.env.TEST_PASSWORD,
    grant: 5,
    nickname: "testUser01",
};

const testCategory = {
    id: 0,
    name: "카테고리41",
};

const testPost = {
    id: 0,
    title: "테스트 타이틀",
    description: "테스트 본문",
    tag: "#테스트태그01 #테스트태그02 #테스트태그03",
};

const testComment = {
    id: 0,
    description: "테스트 댓글",
};

describe("Integration Test", () => {
    it("create user", async () => {
        const CREATE_USER = gql`
            mutation($userId: String!, $password: String!, $grant: Int!, $nickname: String!) {
                createUser(
                    userId: $userId
                    password: $password
                    grant: $grant
                    nickname: $nickname
                ) {
                    id
                    userId
                    nickname
                    grant
                }
            }
        `;
        const {
            data: { createUser },
        } = await mutate({
            mutation: CREATE_USER,
            variables: testUser,
        });
        const { userId, grant, nickname } = testUser;
        testUser["id"] = createUser.id;
        expect(createUser).toEqual({ id: createUser.id, userId, grant, nickname });
    });
    it("create user Error with exuser", async () => {
        const CREATE_USER = gql`
            mutation($userId: String!, $password: String!, $grant: Int!, $nickname: String!) {
                createUser(
                    userId: $userId
                    password: $password
                    grant: $grant
                    nickname: $nickname
                ) {
                    id
                    userId
                    nickname
                    grant
                }
            }
        `;
        const { errors } = await mutate({
            mutation: CREATE_USER,
            variables: testUser,
        });
        expect(errors[0].message).toEqual("Username is taken");
    });
    // 해당 테스트의 에러가 다음 테스트에 영향을 미친다. 이를 어떻게 없앨 수 있을까?

    // it('login Error with Wrong passwod', async () => {
    // 	const LOGIN = gql`
    // 		mutation($userId: String!, $password: String!) {
    // 			login(userId: $userId, password: $password) {
    // 				id
    // 				userId
    // 				nickname
    // 				grant
    // 			}
    // 		}
    // 	`;
    // 	const { userId } = testUser;
    // 	const result = await mutate({
    // 		mutation: LOGIN,
    // 		variables: { userId, password: 'wrong_password' }
    // 	});
    // 	console.log(result);
    // 	return expect(result).toEqual('존재하지 않는 사용자입니다.');
    // });
    it("login succes", async () => {
        const LOGIN = gql`
            mutation($userId: String!, $password: String!) {
                login(userId: $userId, password: $password) {
                    id
                    userId
                    nickname
                    grant
                }
            }
        `;
        const { userId, grant, nickname, password, id } = testUser;
        const {
            data: { login },
        } = await mutate({
            mutation: LOGIN,
            variables: { userId, password },
        });
        expect(login).toEqual({ id, userId, grant, nickname });
    });
    it("create category", async () => {
        const { name } = testCategory;
        const CREATE_CATEGORY = gql`
            mutation($category_name: String!) {
                createCategory(category_name: $category_name) {
                    id
                    name
                }
            }
        `;
        const {
            data: { createCategory },
        } = await mutate({
            mutation: CREATE_CATEGORY,
            variables: {
                category_name: name,
            },
        });
        testCategory["id"] = createCategory.id;
        expect(createCategory).toEqual({ id: createCategory.id, name });
    });
    it("create category Error with excategory", async () => {
        const { name } = testCategory;
        const CREATE_CATEGORY = gql`
            mutation($category_name: String!) {
                createCategory(category_name: $category_name) {
                    id
                    name
                }
            }
        `;
        const { errors } = await mutate({
            mutation: CREATE_CATEGORY,
            variables: {
                category_name: name,
            },
        });
        expect(errors[0].message).toBe("중복된 카테고리입니다.");
    });
    it("create post", async () => {
        const { id: user_id, nickname } = testUser;
        const { title, description, tag } = testPost;
        const { id: category_id, name } = testCategory;
        const CREATE_POST = gql`
            mutation($title: String!, $description: String!, $tag: String!, $category_id: ID!) {
                createPost(
                    title: $title
                    description: $description
                    tag: $tag
                    category_id: $category_id
                ) {
                    id
                    title
                    description
                    Tags {
                        name
                    }
                    Category {
                        id
                        name
                    }
                    User {
                        id
                        nickname
                    }
                }
            }
        `;
        const {
            data: { createPost },
        } = await mutate({
            mutation: CREATE_POST,
            variables: {
                title,
                description,
                tag,
                category_id,
            },
        });
        testPost["id"] = createPost.id;
        expect(createPost).toEqual({
            id: createPost.id,
            title,
            description,
            Category: {
                name,
                id: category_id,
            },
            Tags: [
                {
                    name: "테스트태그01",
                },
                {
                    name: "테스트태그02",
                },
                {
                    name: "테스트태그03",
                },
            ],
            User: {
                id: user_id,
                nickname,
            },
        });
    });
    it("read post", async () => {
        const { id: user_id, userId, nickname } = testUser;
        const { id: post_id, title, description } = testPost;
        const { id: category_id, name } = testCategory;
        const POST = gql`
            query($post_id: ID!) {
                post(post_id: $post_id) {
                    id
                    title
                    description
                    Tags {
                        name
                    }
                    Category {
                        id
                        name
                    }
                    User {
                        id
                        nickname
                    }
                }
            }
        `;
        const {
            data: { post },
        } = await query({
            mutation: POST,
            variables: {
                post_id,
            },
        });
        expect(post).toEqual({
            id: post_id,
            title,
            description,
            Category: {
                name,
                id: category_id,
            },
            Tags: [
                {
                    name: "테스트태그01",
                },
                {
                    name: "테스트태그02",
                },
                {
                    name: "테스트태그03",
                },
            ],
            User: {
                id: user_id,
                nickname,
            },
        });
    });
    it("read post Error with no post", async () => {
        const POST = gql`
            query($post_id: ID!) {
                post(post_id: $post_id) {
                    id
                    title
                    description
                    Tags {
                        name
                    }
                    Category {
                        id
                        name
                    }
                    User {
                        id
                        nickname
                    }
                }
            }
        `;
        const { errors } = await query({
            mutation: POST,
            variables: {
                post_id: "wrong_id",
            },
        });
        expect(errors[0].message).toBe("포스트가 존재하지 않습니다.");
    });
    it("update post", async () => {
        const { id: post_id } = testPost;
        const UPDATE_POST = gql`
            mutation($post_id: ID!, $title: String!, $description: String!, $tag: String) {
                updatePost(post_id: $post_id, title: $title, description: $description, tag: $tag)
            }
        `;
        const {
            data: { updatePost },
        } = await mutate({
            mutation: UPDATE_POST,
            variables: {
                post_id,
                title: "수정된 타이틀",
                description: "수정된 본문",
                tag: "#수정된태그01 #수정된태그02 #수정된태그03",
            },
        });

        expect(updatePost).toEqual([1]);
    });
    it("update post Error with no post", async () => {
        const UPDATE_POST = gql`
            mutation($post_id: ID!, $title: String!, $description: String!, $tag: String) {
                updatePost(post_id: $post_id, title: $title, description: $description, tag: $tag)
            }
        `;
        const { errors } = await mutate({
            mutation: UPDATE_POST,
            variables: {
                post_id: "wrong_id",
                title: "수정된 타이틀",
                description: "수정된 본문",
                tag: "#수정된태그01 #수정된태그02 #수정된태그03",
            },
        });

        expect(errors[0].message).toBe("포스트가 존재하지 않습니다.");
    });
    it("ceate like", async () => {
        const { id: post_id } = testPost;
        const { id: user_id } = testUser;
        const CREATE_LIKED = gql`
            mutation($post_id: ID!) {
                createLiked(post_id: $post_id)
            }
        `;
        const {
            data: { createLiked },
        } = await mutate({
            mutation: CREATE_LIKED,
            variables: {
                post_id,
            },
        });
        expect(createLiked).toBe(Number(user_id));
    });
    it("ceate like Error with no post", async () => {
        const CREATE_LIKED = gql`
            mutation($post_id: ID!) {
                createLiked(post_id: $post_id)
            }
        `;
        const { errors } = await mutate({
            mutation: CREATE_LIKED,
            variables: {
                post_id: "wrong_id",
            },
        });

        expect(errors[0].message).toBe("포스트가 존재하지 않습니다.");
    });
    it("delete like", async () => {
        const { id: post_id } = testPost;
        const { id: user_id } = testUser;
        const DELETE_LIKED = gql`
            mutation($post_id: ID!) {
                deleteLiked(post_id: $post_id)
            }
        `;
        const {
            data: { deleteLiked },
        } = await mutate({
            mutation: DELETE_LIKED,
            variables: {
                post_id,
            },
        });

        expect(deleteLiked).toBe(Number(user_id));
    });
    it("delete like Error with no post", async () => {
        const DELETE_LIKED = gql`
            mutation($post_id: ID!) {
                deleteLiked(post_id: $post_id)
            }
        `;
        const { errors } = await mutate({
            mutation: DELETE_LIKED,
            variables: {
                post_id: "wrong_id",
            },
        });

        expect(errors[0].message).toBe("포스트가 존재하지 않습니다.");
    });
    it("create comment", async () => {
        const { id: post_id } = testPost;
        const { id: user_id, nickname } = testUser;
        const { description } = testComment;
        const CREATE_COMMENT = gql`
            mutation($post_id: ID!, $description: String!) {
                createComment(post_id: $post_id, description: $description) {
                    id
                    description
                    User {
                        id
                        nickname
                    }
                    PostId
                }
            }
        `;
        const {
            data: { createComment },
        } = await mutate({
            mutation: CREATE_COMMENT,
            variables: {
                post_id,
                description,
            },
        });
        testComment["id"] = createComment.id;
        expect(createComment).toEqual({
            id: createComment.id,
            description,
            User: {
                id: user_id,
                nickname,
            },
            PostId: Number(post_id),
        });
    });
    it("create comment Error with no post", async () => {
        const { description } = testComment;
        const CREATE_COMMENT = gql`
            mutation($post_id: ID!, $description: String!) {
                createComment(post_id: $post_id, description: $description) {
                    id
                    description
                    User {
                        id
                        nickname
                    }
                    PostId
                }
            }
        `;
        const { errors } = await mutate({
            mutation: CREATE_COMMENT,
            variables: {
                post_id: "wrong_id",
                description,
            },
        });
        expect(errors[0].message).toBe("포스트가 존재하지 않습니다.");
    });
    it("update comment", async () => {
        const { id: comment_id } = testComment;
        const UPDATE_COMMENT = gql`
            mutation($comment_id: ID!, $description: String!) {
                updateComment(comment_id: $comment_id, description: $description)
            }
        `;
        const {
            data: { updateComment },
        } = await mutate({
            mutation: UPDATE_COMMENT,
            variables: {
                comment_id,
                description: "수정된 댓글",
            },
        });
        expect(updateComment).toEqual([1]);
    });
    it("update comment Error with no Comment", async () => {
        const UPDATE_COMMENT = gql`
            mutation($comment_id: ID!, $description: String!) {
                updateComment(comment_id: $comment_id, description: $description)
            }
        `;
        const { errors } = await mutate({
            mutation: UPDATE_COMMENT,
            variables: {
                comment_id: "wrong_id",
                description: "수정된 댓글",
            },
        });

        expect(errors[0].message).toBe("댓글이 존재하지 않습니다.");
    });
    it("delete comment", async () => {
        const { id: comment_id } = testComment;
        const DELETE_COMMENT = gql`
            mutation($comment_id: ID!) {
                deleteComment(comment_id: $comment_id)
            }
        `;
        const {
            data: { deleteComment },
        } = await mutate({
            mutation: DELETE_COMMENT,
            variables: {
                comment_id,
            },
        });

        expect(deleteComment).toBe(1);
    });
    it("delete comment Error with no Comment", async () => {
        const DELETE_COMMENT = gql`
            mutation($comment_id: ID!) {
                deleteComment(comment_id: $comment_id)
            }
        `;
        const { errors } = await mutate({
            mutation: DELETE_COMMENT,
            variables: {
                comment_id: "wrong_id",
            },
        });
        expect(errors[0].message).toBe("댓글이 존재하지 않습니다.");
    });
    it("delete post", async () => {
        const { id: post_id } = testPost;
        const DELETE_POST = gql`
            mutation($post_id: ID!) {
                deletePost(post_id: $post_id)
            }
        `;
        const {
            data: { deletePost },
        } = await mutate({
            mutation: DELETE_POST,
            variables: {
                post_id: post_id,
            },
        });

        expect(deletePost).toBe(1);
    });
    it("delete post Error with no post", async () => {
        const DELETE_POST = gql`
            mutation($post_id: ID!) {
                deletePost(post_id: $post_id)
            }
        `;
        const { errors } = await mutate({
            mutation: DELETE_POST,
            variables: {
                post_id: "wrong_id",
            },
        });

        expect(errors[0].message).toBe("포스트가 존재하지 않습니다.");
    });
    it("logout", async () => {
        const LOGOUT = gql`
            mutation {
                logout {
                    id
                    userId
                    nickname
                    grant
                }
            }
        `;
        const { userId, grant, nickname, id } = testUser;
        const {
            data: { logout },
        } = await mutate({
            mutation: LOGOUT,
        });
        expect(logout).toEqual({ id, userId, grant, nickname });
    });
});
