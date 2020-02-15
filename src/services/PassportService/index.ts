import passport from "passport";
import database from "../../models";
import local from "./local";
import { IUser } from "types/services/User";

export default () => {
    passport.serializeUser((user: any, done: any) => {
        return done(null, user.id);
    });

    passport.deserializeUser(async (id: string, done: any) => {
        try {
            const user = await database.User.findOne({ where: { id } });
            const filteredUser = Object.assign({}, user?.toJSON()) as IUser;
            delete filteredUser.password;
            return done(null, user);
        } catch (e) {
            console.error(e);
            return done(e);
        }
    });
    local();
};
