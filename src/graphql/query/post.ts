import { ResolverContextType } from "types/services/User";
import { Container } from "typedi";
import { PostService, ServiceUtils } from "services";

const postService = Container.get(PostService);
const utilService = Container.get(ServiceUtils);

const posts = async (
    _: any,
    { first, afterCursor, ord = "DESC" }: { first: number; afterCursor: number; ord: "DESC" | "ASC" },
    context: ResolverContextType,
    info: any
) => {
    try {
        const obtainedPosts = postService.getPosts(ord);
        return obtainedPosts;
    } catch (error) {
        console.error(error);
        throw new Error(error);
    }
};
const post = async (_: any, { id }: { id: string }, context: ResolverContextType, info: any) => {
    try {
        const obtainedPost = await postService.getPostById(id);
        if (!post) {
            throw new Error("포스트가 존재하지 않습니다.");
        }
        return obtainedPost.toJSON();
    } catch (error) {
        console.error(error);
        throw new Error(error);
    }
};

export default {
    post,
    posts
};
