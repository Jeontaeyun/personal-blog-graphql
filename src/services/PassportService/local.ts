import passport from "passport";
//@ts-ignore
import bcrypt from "bcrypt-nodejs";
//@ts-ignore
import { Strategy as LocalStartegy } from "passport-local";
import database from "../../models";
import { IUser } from "types/services/User";
import { IUserModel } from "models/user";

export default () => {
    passport.use(
        new LocalStartegy(
            {
                usernameField: "userId",
                passwordField: "password"
            },
            async (username: string, password: string, done: any) => {
                try {
                    const user = await database.User.findOne({
                        where: { userId: username }
                    });
                    if (!user) {
                        return done(null, false, { reason: "존재하지 않는 사용자입니다." });
                    }
                    bcrypt.compare(password, user.password, (error: any, result: any) => {
                        if (error) {
                            throw new Error(error);
                        }
                        if (result) {
                            const obtainedUser = Object.assign({}, user.toJSON()) as IUser;
                            delete obtainedUser.password;
                            return done(null, obtainedUser);
                        } else {
                            return done(null, false, { reason: "틀린 비밀번호 입니다." });
                        }
                    });
                } catch (error) {
                    console.error(error);
                    return done(error);
                }
            }
        )
    );
};
