import { IUser, USER_GRANT_ENUM, ResolverContextType } from "@interface/common/User";

import { UserInputError } from "apollo-server-express";
//@ts-ignore
import bcrypt from "bcrypt-nodejs";
import passport from "passport";
import passportConfig from "../../passport";

passportConfig();

const loginFunction = async (userId: string, password: string, req: any) => {
    return passport.authenticate("local", (error: any, user: IUser, info: any) => {
        // Server Error
        if (error) {
            throw new Error(error);
        }
        // Logic Error
        if (info) throw info.reason;
        // No user
        if (!user) {
            throw new Error("유저가 존재하지 않습니다.");
        }
        // req.login is to establish a session and send a response
        req.login((logginedUser: IUser, loginError: any) => {
            if (loginError) {
                throw new Error(loginError);
            }
            return logginedUser;
        });
    })({ body: { userId, password } });
};

const createUser = async (
    _: any,
    {
        userId,
        password,
        nickname,
        grant
    }: { userId: string; password: string; nickname: string; grant: USER_GRANT_ENUM },
    { db }: Pick<ResolverContextType, "db">,
    info: any
) => {
    try {
        const exUser = await db.User.findOne({ where: { userId } });
        if (exUser)
            return new UserInputError("Username is taken", {
                errors: {
                    username: "This username is taken"
                }
            });
        const hashingUser = new Promise((resolve, reject) => {
            // bcrypt can't use async/await
            bcrypt.hash(password, null, null, async (error: any, hashedPassword: string) => {
                if (error) {
                    throw new Error(error);
                }
                const newUser = await db.User.create({
                    userId,
                    password: hashedPassword,
                    nickname,
                    grant
                });
                return resolve(newUser.toJSON());
            });
        });
        return await hashingUser;
    } catch (e) {
        console.error(e);
    }
};

const login = async (
    _: any,
    { userId, password }: { userId: string; password: string },
    { req, user }: Pick<ResolverContextType, "req" | "user">,
    info: any
) => {
    if (!user) {
        const user = await loginFunction(userId, password, req);
        return user;
    } else return new Error("이미 로그인 하였습니다. 로그아웃 해주세요");
};

const logout = (_: any, args: any, { req, user }: Pick<ResolverContextType, "req" | "user">, info: any) => {
    if (user) {
        const logoutedUser = user;
        req.logout();
        return logoutedUser;
    } else return new Error("로그인 된 유저가 없습니다.");
};

export default {
    createUser,
    login,
    logout
};
