import { ResolverContextType } from "types/services/User";
import { Container } from "typedi";
import { PostService } from "services";

const posts = async (
    _: any,
    { limit, ord = "DESC" }: { limit: number; ord: "DESC" | "ASC" },
    { database, user }: ResolverContextType,
    info: any
) => {
    try {
        const postService = Container.get(PostService);
        const obtainedPosts = postService.getPosts(ord);

        return obtainedPosts;
    } catch (e) {
        return new Error("데이터 베이스 오류");
    }
};
const post = async (_: any, { postId }: { postId: string }, { database, user }: ResolverContextType, info: any) => {
    try {
        const postService = Container.get(PostService);
        const obtainedPost = await postService.getPostById(postId);
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
