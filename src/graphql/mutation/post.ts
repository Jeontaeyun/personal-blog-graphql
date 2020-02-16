import { IPostInput } from "types/services/Post";
import { ResolverContextType } from "types/services/User";
import { PostService, ServiceUtils } from "services";

import Container from "typedi";

const postService = Container.get(PostService);
const utilService = Container.get(ServiceUtils);

const createPost = async (_: any, postInput: IPostInput, context: ResolverContextType, info: any) => {
    utilService.checkAdmin(context.user);
    try {
        const userId = context.user.id;
        const newPost = await postService.createPost(postInput, userId);
        return newPost;
    } catch (error) {
        throw new Error("데이터 베이스 오류");
    }
};

const updatePost = async (_: any, postInput: IPostInput & { id: string }, context: ResolverContextType, info: any) => {
    utilService.checkAdmin(context.user);
    try {
        const isUpdated = await postService.updatePost(postInput);
        return isUpdated;
    } catch (error) {
        throw new Error("데이터 베이스 오류");
    }
};

const deletePost = async (_: any, data: { id: string }, context: ResolverContextType, info: any) => {
    utilService.checkAdmin(context.user);
    const { id } = data;
    try {
        const isDeleted = await postService.deletePost(id);
        return isDeleted;
    } catch (error) {
        throw new Error("데이터 베이스 오류");
    }
};

export default { createPost, updatePost, deletePost };
