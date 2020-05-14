import { UserInputError } from "apollo-server";
import Container, { Inject } from "typedi";
import Express from "express";
//@ts-ignore
import bcrypt from "bcrypt-nodejs";
import passport from "passport";

import localStrategy from "./local";
import googleStrategy from "./google";
import githubStrategy from "./github";
import kakaoStrategy from "./kakao";

import database from "../../models/mysql";
import { IUser, USER_GRANT_ENUM, ILoginInput, ILocalSignUpInput, PLATFORM } from "types/services/User";
import { UserStatic } from "models/mysql/user";

export const passportConfig = () => {
    // SerializeUser 미들웨어는 전달받은 객체(정보)를 세션에 저장하는 역할
    passport.serializeUser((user: IUser, done) => {
        return done(null, user.userId);
    });
    // DeserializeUser 미들웨어는 서버로 들어오는 요청마다 세션 정보가 유효한 지를 검사하는 역할
    passport.deserializeUser(async (userId: string, done: any) => {
        try {
            const user = await database.User.findOne({ where: { userId } });
            const filteredUser = Object.assign({}, user?.toJSON()) as IUser;
            delete filteredUser.password;
            return done(null, user);
        } catch (error) {
            console.error(error);
            return done(error);
        }
    });
    localStrategy();
    googleStrategy();
    kakaoStrategy();
    //kakaoStrategy
};

class PassportService {
    @Inject() private _userModel: UserStatic;

    constructor(_userModel: UserStatic) {
        this._userModel = _userModel;
    }

    public signUpLocal = async (userInput: ILocalSignUpInput) => {
        const { userId, password, nickname = "Nickname", grant = USER_GRANT_ENUM.GUEST } = userInput;
        const exUser = await this._userModel.findOne({ where: { userId } });
        if (exUser) {
            throw new UserInputError("Username is taken", {
                errors: {
                    username: "This username is taken"
                }
            });
        }

        const hashedUser: any = await new Promise((resolve, reject) => {
            bcrypt.hash(password, null, null, async (error: any, hashedPassword: string) => {
                if (error) {
                    throw new Error(error);
                }
                const newUser = await this._userModel.create({
                    userId,
                    password: hashedPassword,
                    platform: PLATFORM.LOCAL,
                    nickname,
                    grant
                });
                return resolve(newUser.toJSON());
            });
        });

        delete hashedUser.password;
        return await hashedUser;
    };

    private authenticateGoogle = (req: Express.Request, res: Express.Response) =>
        new Promise((resolve, reject) => {
            passport.authenticate("google", { session: false, scope: ["profile"] }, function(error, data, info) {
                if (error) {
                    reject(error);
                }
                resolve({ data, info });
            })(req, res);
        });

    private authenticateGitHub = (req: Express.Request, res: Express.Response) =>
        new Promise((resolve, reject) => {
            passport.authenticate("github", { session: false }, function(error, data, info) {
                if (error) {
                    reject(error);
                }
                resolve({ data, info });
            });
        });

    private authenticateKakao = (req: Express.Request, res: Express.Response) =>
        new Promise((resolve, reject) => {
            passport.authenticate("kakao", { session: false }, function(error, data, info) {
                if (error) {
                    reject(error);
                }
                resolve({ data, info });
            })(req, res);
        });

    public authenticateLocal = async (loginInput: ILoginInput) => {
        try {
            const { userId, password, platform = PLATFORM.LOCAL } = loginInput;
            return new Promise((resolve, reject) => {
                passport.authenticate("local", (error: any, user: IUser, info: any) => {
                    if (error) {
                        throw new Error(error);
                    }
                    if (info) throw info.reason;
                    if (!user) {
                        throw new Error("유저가 존재하지 않습니다.");
                    }
                    return resolve(user);
                })({ body: { userId, password, platform } });
            });
        } catch (error) {
            console.error(error);
            throw new Error(error);
        }
    };

    public authenticateOauth = async (req: Express.Request, res: Express.Response, platform: PLATFORM) => {
        try {
            switch (platform) {
                case PLATFORM.GOOGLE:
                    return await this.authenticateGoogle(req, res);
                case PLATFORM.GITHUB:
                    return await this.authenticateGitHub(req, res);
                case PLATFORM.KAKAO:
                    return await this.authenticateKakao(req, res);
            }
        } catch (error) {
            console.error(error);
            throw error;
        }
    };
}
Container.set(PassportService, new PassportService(database.User));
export default PassportService;
