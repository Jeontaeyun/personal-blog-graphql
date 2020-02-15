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
    tag: string[];
    categoryId: string;
}

export interface IPostService {
    getPostById: (id: string) => Promise<any>;
    createPost: (data: IPostInput) => Promise<any>;
    updatePost: () => Promise<any>;
    deletePost: () => Promise<any>;
}
