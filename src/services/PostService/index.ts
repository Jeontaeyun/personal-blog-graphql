import { PostStatic, IPostModel } from "models/post";
import { IPostInput, IPostService, IPost } from "types/services/Post";
import Container, { Service, Inject } from "typedi";
import database, { IDatabase } from "models";
import ServiceUtils from "services/ServiceUtils";
import { UserStatic } from "models/user";

@Service()
class PostService implements IPostService {
    @Inject() private _postModel: PostStatic;
    @Inject() private _userModel: UserStatic;
    @Inject() private _serviceUtils: ServiceUtils;

    constructor(_postModel: PostStatic, _userModel: UserStatic) {
        this._postModel = _postModel;
        this._userModel = _userModel;
        this._serviceUtils = new ServiceUtils();
    }

    public getPosts = async (ord: "DESC" | "ASC" = "DESC"): Promise<IPostModel[]> => {
        try {
            const result = await this._postModel.findAll({
                order: [["createdAt", ord]]
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

    public getPostById = async (id: string, ord: "DESC" | "ASC" = "DESC"): Promise<IPostModel> => {
        try {
            const result = await this._postModel.findOne({
                where: { id },
                order: [["createdAt", ord]]
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

    public createPost = async (data: IPostInput) => {
        try {
            const result = await this._postModel.create(data);
            return result;
        } catch (error) {
            console.error(error);
            throw Error(error);
        }
    };

    public updatePost = async () => null;
    public deletePost = async () => null;

    _tagAddFunction = async (newPost: any, tag: string, database: IDatabase) => {
        try {
            let tagArr;
            if (tag) {
                tagArr = tag.match(/#[^\s]+/g);
            }
            if (tagArr) {
                const tagResult = await Promise.all(
                    tagArr.map(async tags => {
                        return await database.Tag.findOrCreate({
                            where: { name: tags.slice(1).toLowerCase() }
                        });
                    })
                );
                return await newPost.addTags(tagResult.map(r => r[0]));
            }
        } catch (e) {
            return new Error("태그 추가 에러");
        }
    };

    _tagRemoveFunction = async (post: IPost, database: IDatabase) => {
        try {
            return database.Tag.removePost(post.id);
        } catch (e) {
            throw new Error("태그 삭제 에러");
        }
    };

    _addImageFunction = () => {};

    _removeImageFunction = () => {};
}

Container.set(PostService, new PostService(database.Post, database.User));

export default PostService;
