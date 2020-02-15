import { IDatabase } from "models";

export interface IUser {
    id: string;
    nickname: string;
    userId: string;
    password: string;
    grant: USER_GRANT_ENUM;
    createdAt?: number;
    updatedAy?: number;
}

export interface IUserResponse {
    nickname: string;
    userId: string;
    grant: USER_GRANT_ENUM;
    createdAt?: number;
    updatedAy?: number;
}

export interface ILocalSignUpInput {
    userId: string;
    password: string;
    nickname?: string;
    grant?: USER_GRANT_ENUM;
}

export interface ILoginInput {
    userId: string;
    password: string;
}

export enum USER_GRANT_ENUM {
    ADMIN = "ADMIN",
    GUEST = "GUEST"
}

export type ResolverContextType = { req: any; database: IDatabase; user: IUser };
