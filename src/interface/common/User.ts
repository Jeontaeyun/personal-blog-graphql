import { IDatabaseTable } from "models";

export interface IUser {
    id: string;
    nickname: string;
    userId: string;
    password: string;
    grant: USER_GRANT_ENUM;
    createdAt?: number;
    updatedAy?: number;
}

export enum USER_GRANT_ENUM {
    ADMIN = "ADMIN",
    GUEST = "GUEST"
}

export type ResolverContextType = { req: any; db: IDatabaseTable; user: IUser };
