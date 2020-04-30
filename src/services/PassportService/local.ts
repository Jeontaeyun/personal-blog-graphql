import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
//@ts-ignore
import bcrypt from "bcrypt-nodejs";
import database from "../../models/mysql";
import { IUser } from "types/services/User";

export default () => {
    passport.use(
        new LocalStrategy(
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
                            const filteredUser = Object.assign({}, user.toJSON()) as IUser;
                            delete filteredUser.password;
                            return done(null, filteredUser);
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
