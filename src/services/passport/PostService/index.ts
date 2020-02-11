import { PostStatic } from "models/post";

interface IPostService {
    getPostById: () => void;
    createPost: () => void;
    updatePost: () => void;
    deletePost: () => void;
}

class PostService {
    private _postModel: PostStatic;
    constructor(postModel: PostStatic) {
        this._postModel = postModel;
    }
    getPostById = async (id: string) => {
        try {
            const result = await this._postModel.findOne({
                where: { id }
            });
            if (result) {
                return result;
            } else {
                throw Error("There is no Post");
            }
        } catch (error) {
            console.error(error);
            throw Error(error);
        }
    };
}
