import { UserInputError } from "apollo-server";
//@ts-ignore
import bcrypt from "bcrypt-nodejs";
import passport from "passport";

import local from "./local";
import database from "../../models/mysql";
import { IUser, USER_GRANT_ENUM, ILoginInput, ILocalSignUpInput, PLATFORM } from "types/services/User";
import Container, { Inject } from "typedi";
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
    local();
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

    private authenticateGoogle = async () => {
        try {
            return new Promise((resolve, reject) => {
                passport.authenticate(
                    "google",
                    {
                        scope: ["profile"]
                    },
                    function(req, res) {
                        return resolve(true);
                    }
                );
            });
        } catch (error) {
            console.error(error);
            throw new Error(error);
        }
    };

    private authenticateGitHub = async () => {
        try {
            return new Promise((resolve, reject) => {
                passport.authenticate("github", {}, function(req, res) {
                    return resolve(true);
                });
            });
        } catch (error) {
            console.error(error);
            throw new Error(error);
        }
    };

    private authenticateKakao = async () => {
        try {
            return new Promise((resolve, reject) => {
                passport.authenticate(
                    "kakao",
                    {
                        scope: ["profile"]
                    },
                    function(req, res) {
                        return resolve(true);
                    }
                );
            });
        } catch (error) {
            console.error(error);
            throw new Error(error);
        }
    };

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

    public authenticateOauth = async (platform: PLATFORM) => {
        switch (platform) {
            case PLATFORM.GOOGLE:
                return this.authenticateGoogle();
            case PLATFORM.GITHUB:
                return this.authenticateGitHub();
            case PLATFORM.KAKAO:
                return this.authenticateKakao();
        }
    };
}
Container.set(PassportService, new PassportService(database.User));
export default PassportService;
