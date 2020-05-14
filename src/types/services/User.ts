import Express from "express";
export enum PLATFORM {
    GOOGLE = "GOOGLE",
    GITHUB = "GITHUB",
    KAKAO = "KAKAO",
    LOCAL = "LOCAL"
}
export interface IUser {
    id: string;
    nickname?: string;
    userId: string;
    platform: PLATFORM;
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
    platform: PLATFORM;
}

export enum USER_GRANT_ENUM {
    ADMIN = "ADMIN",
    GUEST = "GUEST"
}

export type ResolverContextType = { req: Express.Request; res: Express.Response; user: any };
