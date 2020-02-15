import { Service, Inject, Container } from "typedi";
import { UserInputError } from "apollo-server";
//@ts-ignore
import bcrypt from "bcrypt-nodejs";

import { UserStatic } from "models/user";
import { ILocalSignUpInput, USER_GRANT_ENUM, IUser, ILoginInput } from "types/services/User";
import database from "models";
import passport, { PassportStatic } from "passport";

interface IUserService {
    signUp?: (strategy: string) => void;
    signUpWithLocal: (userInput: ILocalSignUpInput) => Promise<any>;
    login: () => void;
    logout: () => void;
}

@Service()
class UserService implements IUserService {
    @Inject() private _userModel: UserStatic;
    @Inject() private _passport: PassportStatic;

    constructor(_userModel: UserStatic, _passport: PassportStatic) {
        this._userModel = _userModel;
        this._passport = _passport;
    }

    public signUpWithLocal = async (userInput: ILocalSignUpInput) => {
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
                    nickname,
                    grant
                });
                return resolve(newUser.toJSON());
            });
        });

        delete hashedUser.password;
        return await hashedUser;
    };

    public loginWithLocal = async (loginInput: ILoginInput) => {
        try {
            const { userId, password } = loginInput;
            return new Promise((resolve, reject) => {
                this._passport.authenticate("local", (error: any, user: IUser, info: any) => {
                    if (error) {
                        throw new Error(error);
                    }
                    if (info) throw info.reason;
                    if (!user) {
                        throw new Error("유저가 존재하지 않습니다.");
                    }
                    return resolve(user);
                })({ body: { userId, password } });
            });
        } catch (error) {
            console.error(error);
            throw new Error(error);
        }
    };

    public login = () => {};
    public logout = () => {};
}
Container.set(UserService, new UserService(database.User, passport));
export default UserService;
