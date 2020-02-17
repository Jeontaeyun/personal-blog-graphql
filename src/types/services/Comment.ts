export interface IComment {
    id?: string;
    description: string;
    userId: string;
    postId: string;
    recommentId?: string;
    createdAt?: number;
    updatedAy?: number;
}

export interface ICommentInput {
    description: string;
    userId: string;
    recommentId?: string;
}
