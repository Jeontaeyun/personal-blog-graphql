export interface IPost {
    id?: string;
    title: string;
    description: string;
    userId: string;
    categoryId: string;
    createdAt?: number;
    updatedAy?: number;
}

export interface IPostInput {
    id?: string;
    title: string;
    description: string;
    tags: string;
    categoryId: string;
}

export interface IPostService {
    getPosts: () => Promise<any>;
    getPostById: (id: string) => Promise<any>;
    createPost: (postInput: IPostInput, userId: string) => Promise<any>;
    updatePost: (postInput: IPostInput & { id: string }, userId: string) => Promise<boolean>;
    deletePost: (id: string, userId: string) => Promise<boolean>;
}
