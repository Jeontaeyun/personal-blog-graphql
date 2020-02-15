import { IPost, IPostInput } from "types/services/Post";
import { IDatabase } from "models";
import { USER_GRANT_ENUM, ResolverContextType } from "types/services/User";
import { PostService } from "services";

import { AuthenticationError } from "apollo-server-express";

const createPost = async (_: Parent, args: IPostInput, { database, user }: ResolverContextType, info: any) => {
    if (!user || !(user.grant === USER_GRANT_ENUM.ADMIN)) {
        throw new AuthenticationError("must be ADMIN");
    }
    try {
        const postService = new PostService(database.Post);
        const result = await postService.createPost(args);
        const newPost = await db.Post.create({
            title,
            description,
            UserId: user.id,
            CategoryId: categoryId
        });
        await tagAddFunction(newPost, tag, db);
        const post = await db.Post.findOne({
            where: { id: newPost.get("id") },
            include: [
                {
                    model: db.User,
                    attributes: ["id", "nickname"]
                },
                {
                    model: db.Category,
                    attributes: ["id", "name"]
                },
                {
                    model: db.Tag,
                    through: "PostTag",
                    as: "Tags",
                    attributes: ["id", "name"]
                }
            ]
        });
        return post.toJSON();
    } catch (e) {
        return new Error("데이터 베이스 오류");
    }
};

const updatePost = async (
    _: any,
    {
        post_id,
        title,
        description,
        tag,
        category_id
    }: { post_id: string; title: string; description: string; category_id: string; tag: string },
    { db, user }: ResolverContextType,
    info: any
) => {
    if (!user || !(user.grant === USER_GRANT_ENUM.ADMIN)) {
        return new AuthenticationError("must be ADMIN");
    }
    const post = await db.Post.findOne({
        where: { id: post_id }
    });
    if (!post) return new Error("포스트가 존재하지 않습니다.");
    if (tag) {
        await tagRemoveFunction(post, db);
        await tagAddFunction(post, tag, db);
    }
    try {
        return await db.Post.update(
            {
                title: title,
                description: description,
                CategoryId: category_id
            },
            {
                where: { id: post_id }
            }
        );
    } catch (e) {
        return new Error("데이터 베이스 오류");
    }
};

const deletePost = async (_: any, { post_id }: { post_id: string }, { db, user }: ResolverContextType, info: any) => {
    if (!user || !(user.grant === USER_GRANT_ENUM.ADMIN)) {
        return new AuthenticationError("must be ADMIN");
    }
    try {
        const post = await db.Post.findOne({
            where: { id: post_id }
        });
        if (!post) return new Error("포스트가 존재하지 않습니다.");
        return await db.Post.destroy({
            where: { id: post_id }
        });
    } catch (e) {
        return new Error("데이터 베이스 오류");
    }
};

export default { createPost, updatePost, deletePost };
