import { PostStatic, IPostModel } from "models/post";
import { IPostInput, IPostService } from "types/services/Post";
import Container, { Service, Inject } from "typedi";
import database from "models";
import ServiceUtils from "services/ServiceUtils";
import { UserStatic } from "models/user";
import { TagStatic, ITagModel } from "models/tag";
import { CategoryStatic } from "models/category";

@Service()
class PostService implements IPostService {
    @Inject() private _postModel: PostStatic;
    @Inject() private _userModel: UserStatic;
    @Inject() private _tagModel: TagStatic;
    @Inject() private _categoryModel: CategoryStatic;
    @Inject() private _serviceUtils: ServiceUtils;

    constructor(_postModel: PostStatic, _userModel: UserStatic, _tagModel: TagStatic, _categoryModel: CategoryStatic) {
        this._postModel = _postModel;
        this._userModel = _userModel;
        this._tagModel = _tagModel;
        this._categoryModel = _categoryModel;
        this._serviceUtils = new ServiceUtils();
    }

    public getPosts = async (ord: "DESC" | "ASC" = "DESC"): Promise<IPostModel[]> => {
        try {
            const result = await this._postModel.findAll({
                include: [
                    {
                        model: this._userModel,
                        attributes: ["id", "nickname"]
                    },
                    {
                        model: this._categoryModel,
                        attributes: ["id", "name"]
                    },
                    {
                        model: this._tagModel,
                        as: "tags",
                        attributes: ["id", "name"]
                    }
                ],
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
                include: [
                    {
                        model: this._userModel,
                        attributes: ["id", "nickname"]
                    },
                    {
                        model: this._categoryModel,
                        attributes: ["id", "name"]
                    },
                    {
                        model: this._tagModel,
                        as: "tags",
                        attributes: ["id", "name"]
                    }
                ],
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

    public createPost = async (postInput: IPostInput, userId: string) => {
        try {
            const { title, description, tags, categoryId } = postInput;
            const newPost = await this._postModel.create({
                title,
                description,
                categoryId,
                userId
            });

            await this._createAndAssociateTag(newPost, tags);

            const createdPost = await this._postModel.findOne({
                where: { id: newPost.id! },
                include: [
                    {
                        model: this._userModel,
                        attributes: ["id", "nickname"]
                    },
                    {
                        model: this._categoryModel,
                        attributes: ["id", "name"]
                    },
                    {
                        model: this._tagModel,
                        as: "tags",
                        attributes: ["id", "name"]
                    }
                ]
            });
            console.log(createdPost?.toJSON());
            return createdPost?.toJSON();
        } catch (error) {
            console.error(error);
            throw Error(error);
        }
    };

    public updatePost = async (postInput: IPostInput & { id: string }) => {
        try {
            const { id, tags, title, description, categoryId } = postInput;
            const post = await this._postModel.findOne({
                where: { id }
            });
            if (!post) {
                throw new Error("포스트가 존재하지 않습니다.");
            }
            if (tags) {
                await this._removeAndSeparateTag(post);
                await this._createAndAssociateTag(post, tags);
            }
            const [isUpdated] = await this._postModel.update(
                {
                    title,
                    description,
                    CategoryId: categoryId
                },
                { where: { id } }
            );
            return !!isUpdated;
        } catch (error) {
            console.error(error);
            throw Error(error);
        }
    };

    public deletePost = async (id: string) => {
        try {
            const hasPost = !!(await this._postModel.findOne({ where: { id } }));
            if (hasPost) {
                const isDeleted = await this._postModel.destroy({
                    where: { id }
                });
                return !!isDeleted;
            } else {
                throw new Error("포스트가 존재하지 않습니다.");
            }
        } catch (error) {
            console.error(error);
            throw Error(error);
        }
    };

    _createAndAssociateTag = async (newPost: IPostModel, tags: string) => {
        try {
            let tagArray: string[] = [];
            if (tags) {
                tagArray = tagArray.concat(tags.match(/#[^\s]+/g)!);
            }
            if (tagArray) {
                const tagResult = await Promise.all(
                    tagArray.map(async (tag: string) => {
                        return await this._tagModel.findOrCreate({
                            where: { name: tag.slice(1).toLowerCase() }
                        });
                    })
                );
                return await newPost.addTags(tagResult.map(result => result[0]));
            }
        } catch (error) {
            throw new Error(error);
        }
    };

    _removeAndSeparateTag = async (post: IPostModel) => {
        try {
            const tags = await post.getTags();
            const exTags: ITagModel[] = Object.values(tags);
            return await post.removeTags(exTags);
        } catch (error) {
            throw new Error(error);
        }
    };

    _addImageFunction = () => {};

    _removeImageFunction = () => {};
}

Container.set(PostService, new PostService(database.Post, database.User, database.Tag, database.Category));

export default PostService;
