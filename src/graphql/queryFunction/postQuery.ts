import { ResolverContextType } from "@interface/common/User";

const paginate = ({ page, pageSize }: { page: number; pageSize: number }) => {
    const offset = page * pageSize;
    const limit = offset + pageSize;
    return {
        offset,
        limit
    };
};

const posts = async (
    _: any,
    { limit, ord = "DESC", category_id }: { limit: number; ord: "DESC" | "ASC"; category_id: string },
    { db, user }: ResolverContextType,
    info: any
) => {
    try {
        let postCondition = {};
        if (ord !== "DESC" && ord !== "ASC") {
            return new Error("올바른 정렬을 매개변수를 입력해주세요");
        }
        if (category_id) {
            postCondition = { CategoryId: category_id };
        }
        const obtainedPosts = await db.Post.findAll({
            where: postCondition,
            order: [["createdAt", ord]],
            include: [
                {
                    model: db.User,
                    through: "Like",
                    as: "Liker",
                    attributes: ["id", "nickname"]
                },
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
        return obtainedPosts;
    } catch (e) {
        return new Error("데이터 베이스 오류");
    }
};
const post = async (_: any, { post_id }: { post_id: string }, { db, user }: ResolverContextType, info: any) => {
    try {
        const obtainedPost = await db.Post.findOne({
            where: { id: post_id },
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
                },
                {
                    model: db.User,
                    through: "Like",
                    as: "Liker",
                    attributes: ["id"]
                }
            ]
        });
        if (!post) {
            return new Error("포스트가 존재하지 않습니다.");
        }
        return obtainedPost.toJSON();
    } catch (e) {
        return new Error("데이터 베이스 오류");
    }
};

export default {
    post,
    posts
};
