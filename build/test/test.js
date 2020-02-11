"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
    it("create user", () => __awaiter(void 0, void 0, void 0, function* () {
        const CREATE_USER = gql `
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
        const { data: { createUser }, } = yield mutate({
            mutation: CREATE_USER,
            variables: testUser,
        });
        const { userId, grant, nickname } = testUser;
        testUser["id"] = createUser.id;
        expect(createUser).toEqual({ id: createUser.id, userId, grant, nickname });
    }));
    it("create user Error with exuser", () => __awaiter(void 0, void 0, void 0, function* () {
        const CREATE_USER = gql `
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
        const { errors } = yield mutate({
            mutation: CREATE_USER,
            variables: testUser,
        });
        expect(errors[0].message).toEqual("Username is taken");
    }));
    it("login succes", () => __awaiter(void 0, void 0, void 0, function* () {
        const LOGIN = gql `
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
        const { data: { login }, } = yield mutate({
            mutation: LOGIN,
            variables: { userId, password },
        });
        expect(login).toEqual({ id, userId, grant, nickname });
    }));
    it("create category", () => __awaiter(void 0, void 0, void 0, function* () {
        const { name } = testCategory;
        const CREATE_CATEGORY = gql `
            mutation($category_name: String!) {
                createCategory(category_name: $category_name) {
                    id
                    name
                }
            }
        `;
        const { data: { createCategory }, } = yield mutate({
            mutation: CREATE_CATEGORY,
            variables: {
                category_name: name,
            },
        });
        testCategory["id"] = createCategory.id;
        expect(createCategory).toEqual({ id: createCategory.id, name });
    }));
    it("create category Error with excategory", () => __awaiter(void 0, void 0, void 0, function* () {
        const { name } = testCategory;
        const CREATE_CATEGORY = gql `
            mutation($category_name: String!) {
                createCategory(category_name: $category_name) {
                    id
                    name
                }
            }
        `;
        const { errors } = yield mutate({
            mutation: CREATE_CATEGORY,
            variables: {
                category_name: name,
            },
        });
        expect(errors[0].message).toBe("중복된 카테고리입니다.");
    }));
    it("create post", () => __awaiter(void 0, void 0, void 0, function* () {
        const { id: user_id, nickname } = testUser;
        const { title, description, tag } = testPost;
        const { id: category_id, name } = testCategory;
        const CREATE_POST = gql `
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
        const { data: { createPost }, } = yield mutate({
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
    }));
    it("read post", () => __awaiter(void 0, void 0, void 0, function* () {
        const { id: user_id, userId, nickname } = testUser;
        const { id: post_id, title, description } = testPost;
        const { id: category_id, name } = testCategory;
        const POST = gql `
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
        const { data: { post }, } = yield query({
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
    }));
    it("read post Error with no post", () => __awaiter(void 0, void 0, void 0, function* () {
        const POST = gql `
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
        const { errors } = yield query({
            mutation: POST,
            variables: {
                post_id: "wrong_id",
            },
        });
        expect(errors[0].message).toBe("포스트가 존재하지 않습니다.");
    }));
    it("update post", () => __awaiter(void 0, void 0, void 0, function* () {
        const { id: post_id } = testPost;
        const UPDATE_POST = gql `
            mutation($post_id: ID!, $title: String!, $description: String!, $tag: String) {
                updatePost(post_id: $post_id, title: $title, description: $description, tag: $tag)
            }
        `;
        const { data: { updatePost }, } = yield mutate({
            mutation: UPDATE_POST,
            variables: {
                post_id,
                title: "수정된 타이틀",
                description: "수정된 본문",
                tag: "#수정된태그01 #수정된태그02 #수정된태그03",
            },
        });
        expect(updatePost).toEqual([1]);
    }));
    it("update post Error with no post", () => __awaiter(void 0, void 0, void 0, function* () {
        const UPDATE_POST = gql `
            mutation($post_id: ID!, $title: String!, $description: String!, $tag: String) {
                updatePost(post_id: $post_id, title: $title, description: $description, tag: $tag)
            }
        `;
        const { errors } = yield mutate({
            mutation: UPDATE_POST,
            variables: {
                post_id: "wrong_id",
                title: "수정된 타이틀",
                description: "수정된 본문",
                tag: "#수정된태그01 #수정된태그02 #수정된태그03",
            },
        });
        expect(errors[0].message).toBe("포스트가 존재하지 않습니다.");
    }));
    it("ceate like", () => __awaiter(void 0, void 0, void 0, function* () {
        const { id: post_id } = testPost;
        const { id: user_id } = testUser;
        const CREATE_LIKED = gql `
            mutation($post_id: ID!) {
                createLiked(post_id: $post_id)
            }
        `;
        const { data: { createLiked }, } = yield mutate({
            mutation: CREATE_LIKED,
            variables: {
                post_id,
            },
        });
        expect(createLiked).toBe(Number(user_id));
    }));
    it("ceate like Error with no post", () => __awaiter(void 0, void 0, void 0, function* () {
        const CREATE_LIKED = gql `
            mutation($post_id: ID!) {
                createLiked(post_id: $post_id)
            }
        `;
        const { errors } = yield mutate({
            mutation: CREATE_LIKED,
            variables: {
                post_id: "wrong_id",
            },
        });
        expect(errors[0].message).toBe("포스트가 존재하지 않습니다.");
    }));
    it("delete like", () => __awaiter(void 0, void 0, void 0, function* () {
        const { id: post_id } = testPost;
        const { id: user_id } = testUser;
        const DELETE_LIKED = gql `
            mutation($post_id: ID!) {
                deleteLiked(post_id: $post_id)
            }
        `;
        const { data: { deleteLiked }, } = yield mutate({
            mutation: DELETE_LIKED,
            variables: {
                post_id,
            },
        });
        expect(deleteLiked).toBe(Number(user_id));
    }));
    it("delete like Error with no post", () => __awaiter(void 0, void 0, void 0, function* () {
        const DELETE_LIKED = gql `
            mutation($post_id: ID!) {
                deleteLiked(post_id: $post_id)
            }
        `;
        const { errors } = yield mutate({
            mutation: DELETE_LIKED,
            variables: {
                post_id: "wrong_id",
            },
        });
        expect(errors[0].message).toBe("포스트가 존재하지 않습니다.");
    }));
    it("create comment", () => __awaiter(void 0, void 0, void 0, function* () {
        const { id: post_id } = testPost;
        const { id: user_id, nickname } = testUser;
        const { description } = testComment;
        const CREATE_COMMENT = gql `
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
        const { data: { createComment }, } = yield mutate({
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
    }));
    it("create comment Error with no post", () => __awaiter(void 0, void 0, void 0, function* () {
        const { description } = testComment;
        const CREATE_COMMENT = gql `
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
        const { errors } = yield mutate({
            mutation: CREATE_COMMENT,
            variables: {
                post_id: "wrong_id",
                description,
            },
        });
        expect(errors[0].message).toBe("포스트가 존재하지 않습니다.");
    }));
    it("update comment", () => __awaiter(void 0, void 0, void 0, function* () {
        const { id: comment_id } = testComment;
        const UPDATE_COMMENT = gql `
            mutation($comment_id: ID!, $description: String!) {
                updateComment(comment_id: $comment_id, description: $description)
            }
        `;
        const { data: { updateComment }, } = yield mutate({
            mutation: UPDATE_COMMENT,
            variables: {
                comment_id,
                description: "수정된 댓글",
            },
        });
        expect(updateComment).toEqual([1]);
    }));
    it("update comment Error with no Comment", () => __awaiter(void 0, void 0, void 0, function* () {
        const UPDATE_COMMENT = gql `
            mutation($comment_id: ID!, $description: String!) {
                updateComment(comment_id: $comment_id, description: $description)
            }
        `;
        const { errors } = yield mutate({
            mutation: UPDATE_COMMENT,
            variables: {
                comment_id: "wrong_id",
                description: "수정된 댓글",
            },
        });
        expect(errors[0].message).toBe("댓글이 존재하지 않습니다.");
    }));
    it("delete comment", () => __awaiter(void 0, void 0, void 0, function* () {
        const { id: comment_id } = testComment;
        const DELETE_COMMENT = gql `
            mutation($comment_id: ID!) {
                deleteComment(comment_id: $comment_id)
            }
        `;
        const { data: { deleteComment }, } = yield mutate({
            mutation: DELETE_COMMENT,
            variables: {
                comment_id,
            },
        });
        expect(deleteComment).toBe(1);
    }));
    it("delete comment Error with no Comment", () => __awaiter(void 0, void 0, void 0, function* () {
        const DELETE_COMMENT = gql `
            mutation($comment_id: ID!) {
                deleteComment(comment_id: $comment_id)
            }
        `;
        const { errors } = yield mutate({
            mutation: DELETE_COMMENT,
            variables: {
                comment_id: "wrong_id",
            },
        });
        expect(errors[0].message).toBe("댓글이 존재하지 않습니다.");
    }));
    it("delete post", () => __awaiter(void 0, void 0, void 0, function* () {
        const { id: post_id } = testPost;
        const DELETE_POST = gql `
            mutation($post_id: ID!) {
                deletePost(post_id: $post_id)
            }
        `;
        const { data: { deletePost }, } = yield mutate({
            mutation: DELETE_POST,
            variables: {
                post_id: post_id,
            },
        });
        expect(deletePost).toBe(1);
    }));
    it("delete post Error with no post", () => __awaiter(void 0, void 0, void 0, function* () {
        const DELETE_POST = gql `
            mutation($post_id: ID!) {
                deletePost(post_id: $post_id)
            }
        `;
        const { errors } = yield mutate({
            mutation: DELETE_POST,
            variables: {
                post_id: "wrong_id",
            },
        });
        expect(errors[0].message).toBe("포스트가 존재하지 않습니다.");
    }));
    it("logout", () => __awaiter(void 0, void 0, void 0, function* () {
        const LOGOUT = gql `
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
        const { data: { logout }, } = yield mutate({
            mutation: LOGOUT,
        });
        expect(logout).toEqual({ id, userId, grant, nickname });
    }));
});
//# sourceMappingURL=test.js.map